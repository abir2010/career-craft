import type { ResumeData } from "../types";

interface TemplateProps {
  resumeData: ResumeData;
}

export function DefaultTemplate({ resumeData }: TemplateProps) {
  const {
    personalInfo,
    experience,
    education,
    projects,
    skills,
    extracurriculars,
  } = resumeData;

  return (
    <div
      id="resume-preview"
      className="w-[8.5in] min-h-[11in] bg-white text-foreground p-8 shadow-lg font-body scale-[0.6] origin-top md:scale-100"
    >
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-4">
        <h1 className="text-4xl font-bold font-headline text-foreground tracking-wide">
          {personalInfo.fullName}
        </h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{personalInfo.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{personalInfo.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <a href={`//${personalInfo.link}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {personalInfo.link}
            </a>
          </div>
        </div>
      </header>
      <main className="space-y-4">
        {personalInfo.careerObjective && (
          <section>
            <p className="text-muted-foreground text-sm text-center">
              {personalInfo.careerObjective}
            </p>
          </section>
        )}
        <section>
          <h2 className="text-xl font-bold font-headline text-primary border-b border-primary/30 pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={exp.id} className={`text-sm ${index < experience.length - 1 ? "mb-3" : ""}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold font-headline">{exp.jobTitle}</h3>
                <p className="text-xs font-medium text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-foreground">{exp.company}</p>
                <p className="text-xs italic text-muted-foreground">{exp.location}</p>
              </div>
              <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
                {exp.description.split("\n").map((line, i) => line && <li key={i}>{line.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold font-headline text-primary border-b border-primary/30 pb-1 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={edu.id} className={`${index < education.length - 1 ? "mb-2" : ""}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold font-headline">{edu.degree}</h3>
                <p className="text-xs font-medium text-muted-foreground">{edu.gradDate}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-foreground">{edu.school}</p>
                <p className="text-xs italic text-muted-foreground">{edu.location}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold font-headline text-primary border-b border-primary/30 pb-1 mb-3">
            Projects
          </h2>
          {projects.map((proj, index) => (
            <div key={proj.id} className={`${index < projects.length - 1 ? "mb-3" : ""}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold font-headline">{proj.name}</h3>
                {proj.link && (
                  <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline shrink-0">
                    {proj.link}
                  </a>
                )}
              </div>
              <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
                {proj.description.split("\n").map((line, i) => line && <li key={i}>{line.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold font-headline text-primary border-b border-primary/30 pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm text-muted-foreground">
            {skills.map((skill) => skill.name).join("  •  ")}
          </p>
        </section>

        {extracurriculars.length > 0 && (
          <section>
            <h2 className="text-xl font-bold font-headline text-primary border-b border-primary/30 pb-1 mb-3">
              Extracurricular Activities
            </h2>
            {extracurriculars.map((extra, index) => (
              <div key={extra.id} className={`${index < extracurriculars.length - 1 ? "mb-2" : ""}`}>
                <h3 className="text-base font-semibold font-headline">{extra.activity}</h3>
                <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
                  {extra.description.split("\n").map((line, i) => line && <li key={i}>{line.replace(/^- /, "")}</li>)}
                </ul>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
