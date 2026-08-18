import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "server", "data", "admissions");

export type InternalNote = { text: string; at: string };

export type ApplicationRecord = {
  reference: string;
  status: string;
  internalNotes: InternalNote[];
  submittedAt: string;
  child: {
    firstName: string;
    middleName: string;
    surname: string;
    dateOfBirth: string;
    gender: string;
    currentSchool: string;
    program: string;
    grade: string;
    admissionYear: string;
    admissionTerm: string;
  };
  parent: {
    firstName: string;
    surname: string;
    relationship: string;
    email: string;
    phone: string;
    alternativePhone: string;
    address: string;
  };
  preferences: {
    whyInterested: string;
    hearAbout: string;
    wantsTour: boolean;
    tourDate: string;
    tourTime: string;
    additionalInfo: string;
  };
};

export const APPLICATION_STATUSES = [
  "New",
  "Under Review",
  "Tour Scheduled",
  "Assessment Pending",
  "Assessment Complete",
  "Accepted",
  "Waitlisted",
  "Declined",
  "Enrolled",
] as const;

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePath(reference: string): string {
  return path.join(DATA_DIR, `${reference}.json`);
}

function exists(reference: string): boolean {
  return fs.existsSync(filePath(reference));
}

export function generateReference(): string {
  const year = new Date().getFullYear();
  for (let i = 0; i < 25; i++) {
    const num = crypto.randomInt(0, 1_000_000);
    const ref = `BVS-${year}-${String(num).padStart(6, "0")}`;
    if (!exists(ref)) return ref;
  }
  return `BVS-${year}-${String(Date.now()).slice(-6)}`;
}

export function saveApplication(record: ApplicationRecord): void {
  ensureDir();
  fs.writeFileSync(filePath(record.reference), JSON.stringify(record, null, 2), "utf-8");
}

export function listApplications(): ApplicationRecord[] {
  ensureDir();
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf-8")) as ApplicationRecord;
      } catch {
        return null;
      }
    })
    .filter((r): r is ApplicationRecord => r !== null)
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function getApplication(reference: string): ApplicationRecord | null {
  if (!/^BVS-\d{4}-\d{6}$/.test(reference)) return null;
  const file = filePath(reference);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as ApplicationRecord;
  } catch {
    return null;
  }
}

export function updateApplication(
  reference: string,
  patch: { status?: string; note?: string }
): ApplicationRecord | null {
  const record = getApplication(reference);
  if (!record) return null;
  if (patch.status && (APPLICATION_STATUSES as readonly string[]).includes(patch.status)) {
    record.status = patch.status;
  }
  if (patch.note && patch.note.trim()) {
    record.internalNotes.push({ text: patch.note.trim().slice(0, 2000), at: new Date().toISOString() });
  }
  saveApplication(record);
  return record;
}

/** True when an application for the same child + parent email exists within the window. */
export function hasRecentDuplicate(child: { firstName: string; surname: string; dateOfBirth: string }, email: string, windowMs: number): boolean {
  const cutoff = Date.now() - windowMs;
  return listApplications().some((r) => {
    const at = new Date(r.submittedAt).getTime();
    if (at < cutoff) return false;
    return (
      r.parent.email.toLowerCase() === email.toLowerCase() &&
      r.child.firstName.toLowerCase() === child.firstName.toLowerCase() &&
      r.child.surname.toLowerCase() === child.surname.toLowerCase() &&
      r.child.dateOfBirth === child.dateOfBirth
    );
  });
}
