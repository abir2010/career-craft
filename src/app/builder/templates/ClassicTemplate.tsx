import type { ResumeData } from "../types";

interface TemplateProps {
  resumeData: ResumeData;
}

export function ClassicTemplate({ resumeData }: TemplateProps) {
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
      className="w-[8.5in] min-h-[11in] bg-white text-foreground p-10 shadow-lg font-serif scale-[0.6] origin-top md:scale-100"
    >
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold tracking-wider uppercase">
          {personalInfo.fullName}
        </h1>
        <div className="flex justify-center items-center gap-x-3 mt-2 text-xs text-muted-foreground">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phoneNumber}</span>
          <span>&bull;</span>
          <span>{personalInfo.address}</span>
          {personalInfo.link && (
            <>
              <span>&bull;</span>
              <a
                href={`//${personalInfo.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {personalInfo.link}
              </a>
            </>
          )}
        </div>
      </header>
      <div className="border-t-2 border-b-2 border-foreground my-4 py-1">
        <p className="text-center text-sm">{personalInfo.careerObjective}</p>
      </div>
      <main className="space-y-6">
        <section>
          <h2 className="text-lg font-bold tracking-widest uppercase border-b-2 border-foreground pb-1 mb-3">
            Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={exp.id} className={`text-sm ${index < experience.length - 1 ? "mb-3" : ""}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold">{exp.jobTitle}</h3>
                <p className="text-xs font-medium text-muted-foreground">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-medium text-foreground">{exp.company}</p>
                <p className="text-xs italic text-muted-foreground">{exp.location}</p>
              </div>
              <ul className="pl-5 mt-1 list-disc text-muted-foreground space-y-0.5 text-xs">
                {exp.description.split("\n").map((line, i) => line && <li key={i}>{line.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-bold tracking-widest uppercase border-b-2 border-foreground pb-1 mb-3">
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={edu.id} className={`${index < education.length - 1 ? "mb-2" : ""}`}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold">{edu.school}</h3>
                <p className="text-xs font-medium text-muted-foreground">{edu.gradDate}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-foreground">{edu.degree}</p>
                <p className="text-xs italic text-muted-foreground">{edu.location}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-bold tracking-widest uppercase border-b-2 border-foreground pb-1 mb-3">
            Projects
          </h2>
          {projects.map((proj, index) => (
            <div key={proj.id} className={`${index < projects.length - 1 ? "mb-3" : ""}`}>
              <div className="flex items-baseline gap-4">
                <h3 className="text-base font-bold">{proj.name}</h3>
                {proj.link && (
                  <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline shrink-0">
                    {proj.link}
                  </a>
                )}
              </div>
              <ul className="pl-5 mt-1 list-disc text-muted-foreground space-y-0.5 text-xs">
                {proj.description.split("\n").map((line, i) => line && <li key={i}>{line.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-bold tracking-widest uppercase border-b-2 border-foreground pb-1 mb-3">
            Skills
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            {skills.map((skill) => skill.name).join(" | ")}
          </p>
        </section>

        {extracurriculars.length > 0 && (
          <section>
            <h2 className="text-lg font-bold tracking-widest uppercase border-b-2 border-foreground pb-1 mb-3">
              Extracurriculars
            </h2>
            {extracurriculars.map((extra, index) => (
              <div key={extra.id} className={`${index < extracurriculars.length - 1 ? "mb-2" : ""}`}>
                <h3 className="text-base font-bold">{extra.activity}</h3>
                <ul className="pl-5 mt-1 list-disc text-muted-foreground space-y-0.5 text-xs">
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
