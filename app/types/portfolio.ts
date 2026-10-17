export const fileKeys = [
  "home",
  "projects",
  "approach",
  "about",
  "rag",
  "assistant",
  "decs",
  "kla",
  "energyya",
  "hpe",
  "stack",
  "experience",
  "education",
  "articles",
  "contact",
] as const;

export type FileKey = (typeof fileKeys)[number];
export type Theme =
  | "terminal"
  | "ocean"
  | "forest"
  | "midnight"
  | "ember"
  | "cloud"
  | "mint"
  | "lavender"
  | "sand"
  | "rose";
export type CommandEntry = { command?: string; output: string };

export type FileMetadata = {
  name: string;
  kind: "Markdown" | "Python" | "TypeScript" | "JSON" | "Log" | "Plain Text";
  icon: string;
};

export type NavigationItem = { key: FileKey; label: string; hint?: string };
export type NavigationGroup = { label: string; items: NavigationItem[] };
export type SearchResult = { key: FileKey; label: string; detail: string };
