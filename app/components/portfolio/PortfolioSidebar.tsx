import type { Dispatch, SetStateAction } from "react";
import { navigationGroups } from "@/app/data/navigation";
import type { FileKey } from "@/app/types/portfolio";

type PortfolioSidebarProps = {
  active: FileKey;
  mobileFilesOpen: boolean;
  showMoreProjects: boolean;
  onOpenFile: (key: FileKey) => void;
  onClose: () => void;
  setShowMoreProjects: Dispatch<SetStateAction<boolean>>;
};

const extraProjects = [
  { key: "kla", label: "KLA analytics" },
  { key: "energyya", label: "Energyya invoices" },
  { key: "hpe", label: "HPE Technomics" },
] as const;

const navigationGlyph: Record<FileKey, string> = {
  home: "⌂",
  projects: "▦",
  approach: "⌘",
  experience: "◷",
  education: "⌂",
  articles: "¶",
  contact: "↗",
  stack: "⌘",
  about: "○",
  rag: "◆",
  assistant: "◆",
  decs: "◆",
  kla: "◆",
  energyya: "◆",
  hpe: "◆",
};

export function PortfolioSidebar({
  active,
  mobileFilesOpen,
  showMoreProjects,
  onOpenFile,
  onClose,
  setShowMoreProjects,
}: PortfolioSidebarProps) {
  return (
    <aside
      className={`sidebar ${mobileFilesOpen ? "open" : ""}`}
      id="file-tree"
      aria-label="Portfolio files"
    >
      <div className="side-title">
        PORTFOLIO MAP
        <button type="button" aria-label="Close file explorer" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="tree-root">
        <span className="chevron" aria-hidden="true" />
        <span className="folder-icon" aria-hidden="true">
          ▰
        </span>{" "}
        sakthivel@ai-lab
      </div>
      <nav className="tree-group nav-groups" aria-label="Portfolio sections">
        {navigationGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <div className="nav-group-title">{group.label}</div>
            {group.items.map((item) => (
              <div className="nav-entry" key={item.key}>
                <button
                  className={`file nav-item ${["rag", "assistant", "decs"].includes(item.key) ? "nested" : ""} ${active === item.key ? "active" : ""}`}
                  type="button"
                  aria-current={active === item.key ? "page" : undefined}
                  onClick={() => onOpenFile(item.key)}
                >
                  <span className={`nav-dot ${item.key === "rag" ? "rag-dot" : ""}`}>
                    {navigationGlyph[item.key]}
                  </span>
                  <span>{item.label}</span>
                  {item.hint && <span className="file-hint">{item.hint}</span>}
                </button>
                {item.key === "decs" && (
                  <>
                    {showMoreProjects && (
                      <div className="extra-project-nav">
                        {extraProjects.map(({ key, label }) => (
                          <button
                            key={key}
                            type="button"
                            className={`file nav-item nested ${active === key ? "active" : ""}`}
                            aria-current={active === key ? "page" : undefined}
                            onClick={() => onOpenFile(key)}
                          >
                            <span className="nav-dot">◆</span>
                            <span>{label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      className="show-more-nav"
                      type="button"
                      aria-expanded={showMoreProjects}
                      onClick={() => setShowMoreProjects((expanded) => !expanded)}
                    >
                      <span className="more-caret" aria-hidden="true" />
                      {showMoreProjects ? "Show less" : "Show more projects"}
                      <small>{showMoreProjects ? "6 total" : "+3"}</small>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>
      <div className="side-bottom">
        <span className="side-title">CURRENT CONTEXT</span>
        <div className="branch">
          <span>◉</span> AI engineering <span className="branch-status">Chennai</span>
        </div>
      </div>
    </aside>
  );
}
