/* ------------------------------------------------------------------ */
/*  Application form — shared types, defaults & validators (client)    */
/* ------------------------------------------------------------------ */

import { REQUIRES_PHYSICAL_ADDRESS, MAX_APPLICANT_AGE_YEARS } from "../data/applicationOptions";

export type ApplicationForm = {
  childFirstName: string;
  childMiddleName: string;
  childSurname: string;
  dateOfBirth: string;
  gender: string;
  currentSchool: string;
  program: string;
  grade: string;
  admissionYear: string;
  admissionTerm: string;
  parentFirstName: string;
  parentSurname: string;
  relationship: string;
  email: string;
  phone: string;
  alternativePhone: string;
  address: string;
  whyInterested: string;
  hearAbout: string;
  wantsTour: "yes" | "no";
  tourDate: string;
  tourTime: string;
  additionalInfo: string;
  consent: boolean;
};

export const emptyApplicationForm = (): ApplicationForm => ({
  childFirstName: "",
  childMiddleName: "",
  childSurname: "",
  dateOfBirth: "",
  gender: "",
  currentSchool: "",
  program: "",
  grade: "",
  admissionYear: "",
  admissionTerm: "",
  parentFirstName: "",
  parentSurname: "",
  relationship: "",
  email: "",
  phone: "",
  alternativePhone: "",
  address: "",
  whyInterested: "",
  hearAbout: "",
  wantsTour: "no",
  tourDate: "",
  tourTime: "",
  additionalInfo: "",
  consent: false,
});

export type FieldErrors = Partial<Record<keyof ApplicationForm, string>>;

/* ------------------------------------------------------------------ */
/*  Validators                                                         */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Kenya-friendly: +254 7XX XXX XXX, 07XX XXX XXX or international. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s\-()]/g, "");
  if (!digits) return false;
  if (/^(\+?254|0)?7\d{8}$/.test(digits)) return true;
  return /^\+?\d{8,15}$/.test(digits);
}

export function isValidDateOfBirth(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const dob = new Date(`${value}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return false;
  const now = new Date();
  if (dob > now) return false;
  const maxDate = new Date(now.getFullYear() - MAX_APPLICANT_AGE_YEARS, now.getMonth(), now.getDate());
  if (dob < maxDate) return false;
  return true;
}

export function validateChildDetails(form: ApplicationForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.childFirstName.trim()) errors.childFirstName = "Please enter your child's first name.";
  if (!form.childSurname.trim()) errors.childSurname = "Please enter your child's surname.";
  if (!form.dateOfBirth) {
    errors.dateOfBirth = "Please enter your child's date of birth.";
  } else if (!isValidDateOfBirth(form.dateOfBirth)) {
    errors.dateOfBirth = "Please enter a valid date of birth. The date must be in the past.";
  }
  if (!form.gender) errors.gender = "Please select your child's gender.";
  if (!form.program) errors.program = "Please select the program you are applying for.";
  if (!form.grade) errors.grade = "Please select the grade or class you are applying for.";
  if (!form.admissionYear) errors.admissionYear = "Please select the intended year of admission.";
  if (!form.admissionTerm) errors.admissionTerm = "Please select the intended term of entry.";
  return errors;
}

export function validateGuardianDetails(form: ApplicationForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.parentFirstName.trim()) errors.parentFirstName = "Please enter the parent or guardian's first name.";
  if (!form.parentSurname.trim()) errors.parentSurname = "Please enter the parent or guardian's surname.";
  if (!form.relationship) errors.relationship = "Please select the relationship to the child.";
  if (!form.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!isValidPhone(form.phone)) {
    errors.phone = "Please enter a valid phone number, for example +254 712 345 678.";
  }
  if (form.alternativePhone.trim() && !isValidPhone(form.alternativePhone)) {
    errors.alternativePhone = "Please enter a valid alternative phone number.";
  }
  if (REQUIRES_PHYSICAL_ADDRESS && !form.address.trim()) {
    errors.address = "Please enter your physical address.";
  }
  return errors;
}

export function validatePreferences(form: ApplicationForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.hearAbout) errors.hearAbout = "Please tell us how you heard about us.";
  if (form.wantsTour === "yes" && !form.tourDate) {
    errors.tourDate = "Please choose a preferred date for your school tour.";
  }
  return errors;
}

export function validateConsent(form: ApplicationForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.consent) errors.consent = "Please confirm that you agree to the processing of your information.";
  return errors;
}

export function validateAll(form: ApplicationForm): FieldErrors {
  return {
    ...validateChildDetails(form),
    ...validateGuardianDetails(form),
    ...validatePreferences(form),
    ...validateConsent(form),
  };
}

/* ------------------------------------------------------------------ */
/*  Submit payload                                                     */
/* ------------------------------------------------------------------ */
export type ApplicationPayload = {
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
  honeypot: string;
};

export function toPayload(form: ApplicationForm): ApplicationPayload {
  return {
    child: {
      firstName: form.childFirstName.trim(),
      middleName: form.childMiddleName.trim(),
      surname: form.childSurname.trim(),
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      currentSchool: form.currentSchool.trim(),
      program: form.program,
      grade: form.grade,
      admissionYear: form.admissionYear,
      admissionTerm: form.admissionTerm,
    },
    parent: {
      firstName: form.parentFirstName.trim(),
      surname: form.parentSurname.trim(),
      relationship: form.relationship,
      email: form.email.trim(),
      phone: form.phone.trim(),
      alternativePhone: form.alternativePhone.trim(),
      address: form.address.trim(),
    },
    preferences: {
      whyInterested: form.whyInterested.trim(),
      hearAbout: form.hearAbout,
      wantsTour: form.wantsTour === "yes",
      tourDate: form.wantsTour === "yes" ? form.tourDate : "",
      tourTime: form.wantsTour === "yes" ? form.tourTime : "",
      additionalInfo: form.additionalInfo.trim(),
    },
    honeypot: "",
  };
}
