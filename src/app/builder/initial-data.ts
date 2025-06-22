import type { ResumeData } from "./types";

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phoneNumber: "(123) 456-7890",
    address: "San Francisco, CA",
    link: "linkedin.com/in/janedoe",
  },
  experience: [
    {
      id: "exp1",
      jobTitle: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2020",
      endDate: "Present",
      description:
        "- Led the development of a new client-facing web application, resulting in a 20% increase in user engagement.\n- Mentored junior developers and conducted code reviews to maintain high code quality.\n- Collaborated with product managers to define feature requirements and timelines.",
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "B.S. in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      gradDate: "May 2019",
    },
  ],
  skills: [
    { id: "skill1", name: "JavaScript (ES6+)" },
    { id: "skill2", name: "React & Next.js" },
    { id: "skill3", name: "Node.js" },
    { id: "skill4", name: "TypeScript" },
    { id: "skill5", name: "Tailwind CSS" },
    { id: "skill6", name: "SQL & NoSQL Databases" },
  ],
};
