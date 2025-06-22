export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  link: string;
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

export interface Skill {
  id: string;
  name: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}
