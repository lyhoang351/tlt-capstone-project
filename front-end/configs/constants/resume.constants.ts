export namespace ResumeConstants {
    export const TITLE_CONSTANTS = {
        resume: 'Untitled',
        personalDetails: 'Personal Details',
        professionalSummary: 'Professional Summary'
    }
}

const PERSONAL_DETAILS_LABEL = {}
const PROFESSIONAL_SUMMARY_LABEL ={}
const EMPLOYMENT_HISTORY_LABEL = {
    jobTitle: 'Job Title',
    employer: 'Employer',
    startDate: 'Start Date',
    endDate: 'End Date',
    city: 'City',
    description: 'Description',
};
const EDUCATION_LABEL = {
    school: 'School',
    degree: 'Degree',
    startDate: 'Start Date',
    endDate: 'End Date',
    city: 'City',
    description: 'Description',
};
const LINKS_LABEL = { label: 'Label', link: 'Link' };

const SKILLS_LABEL = { name: 'Skills', level: 'Level' };

export const SECTION_TYPE: any = {
    personalDetails: PERSONAL_DETAILS_LABEL,
    employmentHistories: EMPLOYMENT_HISTORY_LABEL,
    educations: EDUCATION_LABEL,
    links: LINKS_LABEL,
    skills: SKILLS_LABEL,
};

export const RESUME_SIZE = {
    width: 1174,
    height: 1660
}