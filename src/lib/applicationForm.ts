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
  hasSecondParent: "yes" | "no";
  secondParentFirstName: string;
  secondParentSurname: string;
  secondParentRelationship: string;
  secondParentEmail: string;
  secondParentPhone: string;
  secondParentAlternativePhone: string;
  secondParentAddress: string;
  healthConditions: "yes" | "no";
  healthDetails: string;
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
  hasSecondParent: "no",
  secondParentFirstName: "",
  secondParentSurname: "",
  secondParentRelationship: "",
  secondParentEmail: "",
  secondParentPhone: "",
  secondParentAlternativePhone: "",
  secondParentAddress: "",
  healthConditions: "no",
  healthDetails: "",
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
  const today = new Date().toISOString().split("T")[0];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - MAX_APPLICANT_AGE_YEARS);
  const minDateStr = minDate.toISOString().split("T")[0];
  if (!form.childFirstName.trim()) errors.childFirstName = "Please enter the student's first name.";
  if (!form.childSurname.trim()) errors.childSurname = "Please enter the student's surname.";
  if (!form.dateOfBirth) {
    errors.dateOfBirth = "Please enter the student's date of birth.";
  } else if (form.dateOfBirth > today) {
    errors.dateOfBirth = "Date of birth cannot be in the future.";
  } else if (form.dateOfBirth < minDateStr) {
    errors.dateOfBirth = `The student's age must be within ${MAX_APPLICANT_AGE_YEARS} years at the time of application.`;
  }
  if (!form.gender) errors.gender = "Please select the student's gender.";
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
  if (!form.relationship) errors.relationship = "Please select the relationship to the student.";
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
  if (form.hasSecondParent === "yes") {
    if (!form.secondParentFirstName.trim()) errors.secondParentFirstName = "Please enter the second parent or guardian's first name.";
    if (!form.secondParentSurname.trim()) errors.secondParentSurname = "Please enter the second parent or guardian's surname.";
    if (!form.secondParentRelationship) errors.secondParentRelationship = "Please select the relationship to the student.";
    if (!form.secondParentPhone.trim()) {
      errors.secondParentPhone = "Please enter the second parent or guardian's phone number.";
    } else if (!isValidPhone(form.secondParentPhone)) {
      errors.secondParentPhone = "Please enter a valid phone number, for example +254 712 345 678.";
    }
    if (form.secondParentEmail.trim() && !EMAIL_RE.test(form.secondParentEmail.trim())) {
      errors.secondParentEmail = "Please enter a valid email address.";
    }
    if (form.secondParentAlternativePhone.trim() && !isValidPhone(form.secondParentAlternativePhone)) {
      errors.secondParentAlternativePhone = "Please enter a valid alternative phone number.";
    }
  }
  return errors;
}

export function validatePreferences(form: ApplicationForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.healthConditions) errors.healthConditions = "Please answer whether the student has any health conditions.";
  if (form.healthConditions === "yes" && !form.healthDetails.trim()) {
    errors.healthDetails = "Please describe the student's health problems, allergies, or special conditions.";
  }
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
    hasSecondParent: boolean;
    secondParentFirstName: string;
    secondParentSurname: string;
    secondParentRelationship: string;
    secondParentEmail: string;
    secondParentPhone: string;
    secondParentAlternativePhone: string;
    secondParentAddress: string;
  };
  preferences: {
    healthConditions: boolean;
    healthDetails: string;
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
      hasSecondParent: form.hasSecondParent === "yes",
      secondParentFirstName: form.secondParentFirstName.trim(),
      secondParentSurname: form.secondParentSurname.trim(),
      secondParentRelationship: form.secondParentRelationship,
      secondParentEmail: form.secondParentEmail.trim(),
      secondParentPhone: form.secondParentPhone.trim(),
      secondParentAlternativePhone: form.secondParentAlternativePhone.trim(),
      secondParentAddress: form.secondParentAddress.trim(),
    },
    preferences: {
      healthConditions: form.healthConditions === "yes",
      healthDetails: form.healthConditions === "yes" ? form.healthDetails.trim() : "",
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
