import type { ApplicationForm } from "./applicationForm";

const DRAFT_KEY = "bvs-application-draft-v1";

export function saveDraft(form: ApplicationForm) {
  try {
    const { consent, ...safe } = form;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(safe));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function loadDraft(): Partial<ApplicationForm> | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<ApplicationForm>;
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}
