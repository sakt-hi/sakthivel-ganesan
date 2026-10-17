import type { ComponentType, SVGProps } from "react";
import {
  Activity,
  AlignLeft,
  Boxes,
  Database,
  FileSearch,
  GitCompareArrows,
  Network,
  Search,
  SearchCode,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiFastapi,
  SiGithub,
  SiGooglegemini,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "@icons-pack/react-simple-icons";

export type PortfolioIconName =
  | "Azure OpenAI"
  | "Microsoft Foundry"
  | "Gemini"
  | "Groq"
  | "AI agents"
  | "Hybrid search"
  | "BM25"
  | "Embeddings"
  | "RRF"
  | "Azure AI Search"
  | "Document Intelligence"
  | "Python"
  | "FastAPI"
  | "C# / .NET"
  | "React"
  | "TypeScript"
  | "Angular"
  | "PostgreSQL"
  | "SQL Server"
  | "Azure Functions"
  | "Docker"
  | "GitHub"
  | "Azure DevOps";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: string | number }>;

const icons: Record<PortfolioIconName, IconComponent> = {
  "Azure OpenAI": Sparkles,
  "Microsoft Foundry": Boxes,
  Gemini: SiGooglegemini,
  Groq: Activity,
  "AI agents": Workflow,
  "Hybrid search": Search,
  BM25: AlignLeft,
  Embeddings: Network,
  RRF: GitCompareArrows,
  "Azure AI Search": SearchCode,
  "Document Intelligence": FileSearch,
  Python: SiPython,
  FastAPI: SiFastapi,
  "C# / .NET": SiDotnet,
  React: SiReact,
  TypeScript: SiTypescript,
  Angular: SiAngular,
  PostgreSQL: SiPostgresql,
  "SQL Server": Database,
  "Azure Functions": Zap,
  Docker: SiDocker,
  GitHub: SiGithub,
  "Azure DevOps": Workflow,
};

type PortfolioIconProps = {
  name: PortfolioIconName;
  size?: number;
  className?: string;
  title?: string;
};

export function PortfolioIcon({ name, size = 20, className, title }: PortfolioIconProps) {
  const Icon = icons[name];
  return (
    <Icon
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={className}
      color="currentColor"
      size={size}
      strokeWidth={1.8}
      role={title ? "img" : undefined}
    />
  );
}
