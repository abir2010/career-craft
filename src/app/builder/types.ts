export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  link: string;
  careerObjective: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  gradDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Extracurricular {
  id: string;
  activity: string;
  description: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  extracurriculars: Extracurricular[];
}
