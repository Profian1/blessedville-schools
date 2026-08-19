/* ------------------------------------------------------------------ */
/*  One-time asset optimizer: recompresses all JPEGs/PNGs in public/   */
/*  in place. Originals are recoverable from git.                      */
/* ------------------------------------------------------------------ */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "public");
const JPEG_QUALITY = 72;
const PNG_QUALITY = 80;
const MAX_DIMENSION = 1600;

const exts = new Set([".jpg", ".jpeg", ".png"]);
let saved = 0;
let total = 0;
const failures = [];

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (exts.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tryWrite(file, out, attempts, delayMs) {
  for (let i = 0; i < attempts; i++) {
    try {
      fs.writeFileSync(file, out);
      return true;
    } catch {
      await sleep(delayMs);
    }
  }
  return false;
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const before = fs.statSync(file).size;
  let pipeline = sharp(file, { failOn: "none" }).rotate().resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    pipeline = pipeline.png({ palette: true, quality: PNG_QUALITY, compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true });
  }

  const out = await pipeline.toBuffer();
  if (!(await tryWrite(file, out, 8, 400))) {
    console.log(`LOCKED  ${path.relative(ROOT, file)}`);
    return false;
  }

  const after = out.length;
  total++;
  saved += before - after;
  const pct = Math.round((1 - after / before) * 100);
  console.log(`${pct >= 0 ? "-" : "+"}${String(Math.abs(pct)).padStart(3)}%  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  ${path.relative(ROOT, file)}`);
  return true;
}

for (const file of walk(ROOT)) {
  try {
    const ok = await processFile(file);
    if (!ok) failures.push(file);
  } catch (err) {
    failures.push(file);
    console.log(`ERROR   ${path.relative(ROOT, file)}: ${err.message}`);
  }
  await sleep(120);
}

/* Deferred retry rounds for locked files */
for (let round = 0; round < 10 && failures.length > 0; round++) {
  await sleep(4000);
  const todo = failures.splice(0);
  for (const file of todo) {
    try {
      const ok = await processFile(file);
      if (!ok) failures.push(file);
    } catch (err) {
      failures.push(file);
      console.log(`ERROR   ${path.relative(ROOT, file)}: ${err.message}`);
    }
    await sleep(200);
  }
}

if (failures.length) {
  console.log(`\n${failures.length} files could not be written (likely locked by another program):`);
  failures.forEach((f) => console.log("  " + f));
} else {
  console.log(`\nDONE: ${total} images processed, ${(saved / 1024 / 1024).toFixed(1)} MB saved`);
}