import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Loader2,
  Search,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import Seo from "../../lib/Seo";
import { Container, Button } from "../../lib/ui";
import { APPLICATION_PROGRAMS } from "../../data/applicationOptions";

const STATUSES = [
  "New",
  "Under Review",
  "Tour Scheduled",
  "Assessment Pending",
  "Assessment Complete",
  "Accepted",
  "Waitlisted",
  "Declined",
  "Enrolled",
];

const TOKEN_KEY = "bvs-admin-token";
const ADMIN_SITE_URL = "https://blessedvilleschools.co.ke/admin/admissions";

type Summary = {
  reference: string;
  status: string;
  submittedAt: string;
  childName: string;
  dateOfBirth: string;
  program: string;
  grade: string;
  admissionYear: string;
  admissionTerm: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
};

type Detail = {
  reference: string;
  status: string;
  internalNotes: { text: string; at: string }[];
  submittedAt: string;
  child: Record<string, string>;
  parent: Record<string, string>;
  preferences: Record<string, string | boolean>;
};

const PROGRAM_LABELS: Record<string, string> = {
  daycare: "Kindergarten & Daycare",
  playgroup: "Playgroup / Preschool",
  "lower-primary": "Lower Primary",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

function formatDateTime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("en-KE", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function LoginGate({ onLogin }: { onLogin: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admissions/admin", { headers: { Authorization: `Bearer ${token.trim()}` } });
      if (res.ok) {
        sessionStorage.setItem(TOKEN_KEY, token.trim());
        onLogin(token.trim());
      } else {
        setError("Invalid access token. Please check and try again.");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto mt-16 max-w-md">
      <div className="rounded-3xl border border-navy/10 bg-white p-8 text-center shadow-[0_20px_50px_-24px_rgba(8,8,8,0.25)]">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold">
          <Lock className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-navy">Admissions Management</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">
          This area is restricted to authorised Blessedville Schools staff.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
          <div>
            <label htmlFor="adminToken" className="mb-1.5 block text-sm font-medium text-navy">
              Access Token
            </label>
            <input
              id="adminToken"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoComplete="off"
              className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-gold"
              placeholder="Enter your access token"
            />
          </div>
          {error && <p role="alert" className="text-xs font-medium text-red-600">{error}</p>}
          <Button type="submit" href="#" variant="gold" disabled={busy} className="w-full disabled:opacity-60">
            {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
          </Button>
        </form>
        <p className="mt-5 text-xs leading-relaxed text-ink/45">
          If you need access, contact the site administrator to configure the ADMIN_TOKEN environment variable.
        </p>
      </div>
    </div>
  );
}

function DetailPanel({ detail, onUpdate }: { detail: Detail; onUpdate: (record: Detail) => void }) {
  const [status, setStatus] = useState(detail.status);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState("");

  useEffect(() => setStatus(detail.status), [detail.status]);

  const rows: [string, string][] = [
    ["Student's Name", `${detail.child.firstName ?? ""} ${detail.child.middleName ?? ""} ${detail.child.surname ?? ""}`.replace(/\s+/g, " ").trim()],
    ["Date of Birth", formatDate(detail.child.dateOfBirth)],
    ["Gender", detail.child.gender ?? ""],
    ["Current School", detail.child.currentSchool ?? "—"],
    ["Program", PROGRAM_LABELS[detail.child.program ?? ""] ?? detail.child.program ?? ""],
    ["Grade / Class", detail.child.grade ?? ""],
    ["Intended Admission", `${detail.child.admissionYear ?? ""} · ${detail.child.admissionTerm ?? ""}`],
    ["Parent / Guardian", `${detail.parent.firstName ?? ""} ${detail.parent.surname ?? ""} (${detail.parent.relationship ?? ""})`],
    ["Parent Email", detail.parent.email ?? ""],
    ["Parent Phone", detail.parent.phone ?? ""],
    ["Alternative Phone", detail.parent.alternativePhone || "—"],
    ["Address", detail.parent.address || "—"],
    ...(detail.parent.hasSecondParent === "true"
      ? ([
          ["Second Parent / Guardian", `${detail.parent.secondParentFirstName ?? ""} ${detail.parent.secondParentSurname ?? ""} (${detail.parent.secondParentRelationship ?? ""})`.replace(/\s+/g, " ").trim()],
          ["Second Parent Phone", detail.parent.secondParentPhone ?? ""],
          ["Second Parent Email", detail.parent.secondParentEmail || "—"],
        ] as [string, string][])
      : []),
    ["Health Conditions", detail.preferences.healthConditions === true ? `Yes — ${String(detail.preferences.healthDetails ?? "")}` : "No"],
    ["Why Interested", String(detail.preferences.whyInterested ?? "") || "—"],
    ["How They Heard", String(detail.preferences.hearAbout ?? "") || "—"],
    ["School Tour", detail.preferences.wantsTour === true ? `Yes — ${String(detail.preferences.tourDate ?? "")}${detail.preferences.tourTime ? ` (${detail.preferences.tourTime})` : ""}` : "No"],
    ["Additional Info", String(detail.preferences.additionalInfo ?? "") || "—"],
    ["Submitted", formatDateTime(detail.submittedAt)],
  ];

  const save = async () => {
    setBusy(true);
    setSaved("");
    try {
      const res = await fetch(`/api/admissions/admin/${detail.reference}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`,
        },
        body: JSON.stringify({ status: status !== detail.status ? status : undefined, note: note.trim() || undefined }),
      });
      const json = await res.json();
      if (json.success) {
        setNote("");
        setSaved("Saved.");
        onUpdate(json.application);
        setTimeout(() => setSaved(""), 2500);
      } else {
        setSaved("Could not save. Try again.");
      }
    } catch {
      setSaved("Could not save. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-navy/10 bg-mist p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "New" ? "bg-gold/20 text-navy" : "bg-navy/10 text-ink/70"}`}>
            {detail.status}
          </span>
          <span className="font-button text-sm font-bold text-navy">{detail.reference}</span>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor={`status-${detail.reference}`} className="sr-only">Update status</label>
          <select
            id={`status-${detail.reference}`}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-navy/15 bg-white px-3 py-2 text-xs font-semibold text-navy outline-none focus:border-gold"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={save}
            disabled={busy}
            className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-navy/90 disabled:opacity-60"
          >
            {busy ? "Saving..." : "Update Status"}
          </button>
        </div>
      </div>

      <dl className="mt-5 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">{label}</dt>
            <dd className="text-ink/80">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 rounded-xl border border-navy/10 bg-white p-4">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-ink/45">Internal Notes (not shown to applicants)</h4>
        <div className="mt-2 space-y-2">
          {detail.internalNotes.length === 0 && <p className="text-sm text-ink/45">No notes yet.</p>}
          {detail.internalNotes.map((n, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink/70">
              <span className="font-medium text-navy">{new Date(n.at).toLocaleString("en-KE")}:</span> {n.text}
            </p>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add an internal note..."
            className="flex-1 rounded-xl border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-gold"
          />
          <button
            onClick={save}
            className="rounded-full border border-navy/15 px-4 py-2 text-xs font-semibold text-navy transition-all hover:bg-navy hover:text-white"
          >
            Add Note
          </button>
        </div>
        {saved && <p role="status" className="mt-2 text-xs font-medium text-green-600">{saved}</p>}
      </div>
    </div>
  );
}

export default function AdmissionsAdmin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [apps, setApps] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [program, setProgram] = useState("");
  const [grade, setGrade] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, Detail>>({});
  const [lastRefreshed, setLastRefreshed] = useState("");

  const authHeaders = useCallback(
    (): HeadersInit => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const refresh = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (program) params.set("program", program);
      if (grade) params.set("grade", grade);
      if (year) params.set("year", year);
      if (status) params.set("status", status);
      const res = await fetch(`/api/admissions/admin?${params.toString()}`, { headers: authHeaders() });
      if (res.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
        return;
      }
      const json = await res.json();
      if (json.success) {
        setApps(json.applications);
        setLastRefreshed(new Date().toLocaleTimeString("en-KE"));
      } else {
        setError(json.message || "Failed to load applications.");
      }
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }, [token, q, program, grade, year, status, authHeaders]);

  useEffect(() => {
    if (token) refresh();
  }, [token, refresh]);

  const years = useMemo(() => {
    const current = new Date().getFullYear();
    return [String(current - 1), String(current), String(current + 1), String(current + 2)];
  }, []);

  const grades = useMemo(() => {
    const found = APPLICATION_PROGRAMS.find((p) => p.key === program);
    return found ? found.grades : [];
  }, [program]);

  const toggleExpand = async (ref: string) => {
    if (expanded === ref) {
      setExpanded(null);
      return;
    }
    setExpanded(ref);
    if (!details[ref]) {
      try {
        const res = await fetch(`/api/admissions/admin/${ref}`, { headers: authHeaders() });
        const json = await res.json();
        if (json.success) setDetails((d) => ({ ...d, [ref]: json.application }));
      } catch {
        /* ignore */
      }
    }
  };

  const handleUpdated = (record: Detail) => {
    setDetails((d) => ({ ...d, [record.reference]: record }));
    refresh();
  };

  const exportCsv = () => {
    const headers = ["Reference", "Status", "Submitted", "Student", "DOB", "Program", "Grade", "Year", "Term", "Parent", "Parent Email", "Parent Phone"];
    const lines = apps.map((a) =>
      [a.reference, a.status, a.submittedAt, a.childName, a.dateOfBirth, PROGRAM_LABELS[a.program] ?? a.program, a.grade, a.admissionYear, a.admissionTerm, a.parentName, a.parentEmail, a.parentPhone]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blessedville-admissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!token) {
    return (
      <>
        <Seo title="Admissions Management | Blessedville Schools" description="Admissions management dashboard" path="/admin/admissions" noindex />
        <section className="min-h-[70vh] bg-mist py-24">
          <Container className="max-w-xl">
            <LoginGate onLogin={setToken} />
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo title="Admissions Management | Blessedville Schools" description="Admissions management dashboard" path="/admin/admissions" noindex />
      <section className="min-h-screen bg-mist py-24 sm:py-28">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-3xl font-semibold text-navy">Admissions Management</h1>
              <p className="mt-1 text-sm text-ink/55">
                {apps.length} application{apps.length === 1 ? "" : "s"}
                {lastRefreshed && <> · last refreshed at {lastRefreshed}</>}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={exportCsv}
                disabled={apps.length === 0}
                className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-xs font-semibold text-navy transition-all hover:border-navy disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
              <button
                onClick={refresh}
                className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-xs font-semibold text-navy transition-all hover:border-navy"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem(TOKEN_KEY);
                  setToken(null);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-navy/90"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
              <div className="relative lg:col-span-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, reference, email..."
                  className="w-full rounded-xl border border-navy/15 bg-white py-2.5 pl-9 pr-3 text-sm text-navy outline-none focus:border-gold"
                />
              </div>
              <select value={program} onChange={(e) => { setProgram(e.target.value); setGrade(""); }} className="rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-gold">
                <option value="">All programs</option>
                {APPLICATION_PROGRAMS.map((p) => (
                  <option key={p.key} value={p.key}>{p.label}</option>
                ))}
              </select>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-gold">
                <option value="">All grades</option>
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-gold">
                <option value="">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-sm text-navy outline-none focus:border-gold">
                <option value="">All statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}

          <div className="mt-6 space-y-3">
            {loading && apps.length === 0 ? (
              <p className="flex items-center gap-2 py-10 text-center text-sm text-ink/50">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading applications...
              </p>
            ) : apps.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-navy/20 bg-white py-14 text-center text-sm text-ink/50">
                No applications match your filters.
              </p>
            ) : (
              apps.map((a) => {
                const isOpen = expanded === a.reference;
                const detail = details[a.reference];
                return (
                  <motion.div key={a.reference} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <button
                      onClick={() => toggleExpand(a.reference)}
                      className="flex w-full flex-col gap-2 rounded-2xl border border-navy/10 bg-white px-5 py-4 text-left transition-all hover:border-gold/50 sm:flex-row sm:items-center sm:justify-between"
                      aria-expanded={isOpen}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-bold text-navy">{a.reference}</span>
                        <span className="font-semibold text-navy">{a.childName}</span>
                        <span className="text-xs text-ink/45">{PROGRAM_LABELS[a.program] ?? a.program} · {a.grade}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-ink/45">{a.parentPhone} · {formatDate(a.dateOfBirth)}</span>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${a.status === "New" ? "bg-gold/20 text-navy" : "bg-navy/10 text-ink/70"}`}>
                          {a.status}
                        </span>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-ink/40" /> : <ChevronDown className="h-4 w-4 text-ink/40" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="mt-2">
                        {detail ? (
                          <DetailPanel detail={detail} onUpdate={handleUpdated} />
                        ) : (
                          <p className="flex items-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm text-ink/50">
                            <Loader2 className="h-4 w-4 animate-spin" /> Loading details...
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          <p className="mt-8 flex items-center gap-2 text-xs text-ink/40">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            Authorised staff only. Internal notes are never shown to applicants. {ADMIN_SITE_URL}
          </p>
        </Container>
      </section>
    </>
  );
}
