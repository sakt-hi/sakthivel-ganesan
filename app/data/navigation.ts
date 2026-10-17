import type { FileKey, FileMetadata, NavigationGroup } from "@/app/types/portfolio";

export const fileInfo: Record<FileKey, FileMetadata> = {
  home: { name: "README.md", kind: "Markdown", icon: "M" },
  projects: { name: "selected_work.md", kind: "Markdown", icon: "M" },
  approach: { name: "principles.md", kind: "Markdown", icon: "M" },
  about: { name: "about_me.md", kind: "Markdown", icon: "M" },
  rag: { name: "hybrid_rag.py", kind: "Python", icon: "◆" },
  assistant: { name: "policy_assistant.py", kind: "Python", icon: "◆" },
  decs: { name: "document_engine.py", kind: "Python", icon: "◆" },
  kla: { name: "inspection_analytics.py", kind: "Python", icon: "◆" },
  energyya: { name: "invoice_automation.py", kind: "Python", icon: "◆" },
  hpe: { name: "technomics_portal.tsx", kind: "TypeScript", icon: "TS" },
  stack: { name: "stack.json", kind: "JSON", icon: "{ }" },
  experience: { name: "career.log", kind: "Log", icon: "≡" },
  education: { name: "education.md", kind: "Markdown", icon: "M" },
  articles: { name: "articles.md", kind: "Markdown", icon: "M" },
  contact: { name: "contact.txt", kind: "Plain Text", icon: "↗" },
};

export const navigationGroups: NavigationGroup[] = [
  {
    label: "START HERE",
    items: [
      { key: "home", label: "Overview", hint: "⌘1" },
      { key: "about", label: "About me" },
      { key: "stack", label: "Toolkit" },
    ],
  },
  {
    label: "SELECTED WORK",
    items: [
      { key: "projects", label: "All projects", hint: "⌘2" },
      { key: "rag", label: "Hybrid RAG" },
      { key: "assistant", label: "Policy assistant" },
      { key: "decs", label: "Document engine" },
    ],
  },
  {
    label: "BACKGROUND",
    items: [
      { key: "experience", label: "Experience" },
      { key: "education", label: "Education" },
      { key: "approach", label: "Engineering principles" },
    ],
  },
  { label: "WRITING", items: [{ key: "articles", label: "Articles" }] },
  { label: "CONNECT", items: [{ key: "contact", label: "Contact" }] },
];

const kindIconClass: Record<FileMetadata["kind"], string> = {
  Markdown: "md",
  Python: "py",
  TypeScript: "ts",
  JSON: "json",
  Log: "log",
  "Plain Text": "mail",
};

export const getFileIconClass = (kind: FileMetadata["kind"]): string => kindIconClass[kind];
