import type { FileKey } from "@/app/types/portfolio";

export function Tags({ values }: { values: string[] }) {
  return (
    <div className="tag-row">
      {values.map((value) => (
        <span className="tag" key={value}>
          {value}
        </span>
      ))}
    </div>
  );
}
export function ProjectDetail({
  back,
  stamp,
  title,
  intro,
  bullets,
  tags,
}: {
  back: (key: FileKey) => void;
  stamp: string;
  title: string;
  intro: string;
  bullets: string[];
  tags: string[];
}) {
  return (
    <>
      <div className="doc-top-actions">
        <button type="button" onClick={() => back("projects")}>
          ← All projects
        </button>
        <button type="button" onClick={() => back("experience")}>
          Experience <span>→</span>
        </button>
      </div>
      <span className="project-stamp">{stamp}</span>
      <h1>{title}</h1>
      <p className="lead">{intro}</p>
      <h2>Work highlights</h2>
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <Tags values={tags} />
      <p className="comment"># selected work archive · details kept to documented project scope</p>
    </>
  );
}
export function ActionLinks() {
  return (
    <div className="file-links">
      <a className="file-link" href="mailto:sakthivel.ganesan@hotmail.com">
        Email me <span className="link-icon">↗</span>
      </a>
      <a className="file-link" href="https://github.com/sakt-hi" target="_blank" rel="noreferrer">
        GitHub <span className="link-icon">↗</span>
      </a>
      <a className="file-link" href="mailto:sakthivel.ganesan@hotmail.com?subject=Resume%20request">
        Request resume <span className="link-icon">↗</span>
      </a>
    </div>
  );
}
