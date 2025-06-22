import type { ResumeData } from "./types";

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phoneNumber: "(123) 456-7890",
    address: "San Francisco, CA",
    link: "linkedin.com/in/janedoe",
    careerObjective:
      "A highly motivated and results-oriented software engineer with a passion for building scalable and user-friendly web applications. Seeking to leverage my expertise in full-stack development to contribute to a dynamic and innovative team.",
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
  projects: [
    {
      id: "proj1",
      name: "E-commerce Platform",
      description:
        "Developed a full-stack e-commerce website using Next.js, Stripe, and a PostgreSQL database. Implemented features such as product search, shopping cart, and user authentication.",
      link: "github.com/janedoe/ecommerce",
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
  extracurriculars: [
    {
      id: "extra1",
      activity: "Hackathon Club",
      description:
        "Participated in multiple hackathons, winning 'Best UI/UX' for a mobile app concept in 2018.",
    },
  ],
};
