/* ------------------------------------------------------------------ */
/*  Application form — configurable options                             */
/*  School staff can adjust these values without touching components.  */
/* ------------------------------------------------------------------ */

export type ProgramKey = "daycare" | "playgroup" | "lower-primary";

export const APPLICATION_PROGRAMS: {
  key: ProgramKey;
  label: string;
  grades: string[];
}[] = [
  {
    key: "daycare",
    label: "Kindergarten & Daycare",
    grades: ["Daycare", "Kindergarten"],
  },
  {
    key: "playgroup",
    label: "Playgroup / Preschool",
    grades: ["Playgroup", "Preschool"],
  },
  {
    key: "lower-primary",
    label: "Lower Primary",
    grades: ["Grade 1", "Grade 2", "Grade 3", "Grade 4"],
  },
];

/** Intended year of admission — shown to parents in this order. */
export const ADMISSION_YEARS = (() => {
  const current = new Date().getFullYear();
  return [String(current), String(current + 1), String(current + 2)];
})();

/** Intended term of entry — Kenya school calendar. */
export const ADMISSION_TERMS = ["Term 1", "Term 2", "Term 3"];

export const GENDERS = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
  { value: "Other", label: "Other / Prefer not to say" },
];

export const RELATIONSHIPS = [
  { value: "Mother", label: "Mother" },
  { value: "Father", label: "Father" },
  { value: "Guardian", label: "Guardian" },
  { value: "Other", label: "Other" },
];

export const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "Social Media",
  "Friend or Family",
  "Current Parent",
  "School Event",
  "Referral",
  "Other",
];

export const TOUR_TIMES = [
  { value: "Morning", label: "Morning (9:00 AM – 12:00 PM)" },
  { value: "Afternoon", label: "Afternoon (12:00 PM – 3:00 PM)" },
  { value: "Weekend", label: "Weekend (by appointment)" },
];

/* ------------------------------------------------------------------ */
/*  Policy flags — update only when confirmed by the school            */
/* ------------------------------------------------------------------ */

/** Whether the physical address field is required (school policy). */
export const REQUIRES_PHYSICAL_ADDRESS = false;

/** Soft sanity limit on applicant age (in years). Not a school policy. */
export const MAX_APPLICANT_AGE_YEARS = 18;

/** Whether to remember draft answers in this browser between visits. */
export const ENABLE_DRAFT_SAVE = true;

export const APPLICATION_NOTICE =
  "Your information is securely submitted to Blessedville Schools and is used only for admissions purposes.";

export const PRIVACY_NOTICE =
  "Blessedville Schools collects the information you provide in this application solely to process and assess your child's application for admission, to contact you regarding the application, and where applicable, to arrange school tours and assessments. Your information is treated as confidential and is never sold or shared with third parties for marketing purposes.";

export const CONSENT_LABEL =
  "I agree to the processing of my information for the purpose of handling this school application.";

export function getGradesForProgram(program: string): string[] {
  return APPLICATION_PROGRAMS.find((p) => p.key === program)?.grades ?? [];
}
