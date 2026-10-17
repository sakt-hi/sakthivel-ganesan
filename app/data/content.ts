import type { FileKey } from "@/app/types/portfolio";
import type { PortfolioIconName } from "@/app/components/icons/PortfolioIcon";

export type ProjectSummary = {
  key: FileKey;
  stamp: string;
  title: string;
  summary: string;
};

export const featuredProjects: ProjectSummary[] = [
  {
    key: "rag",
    stamp: "RAG SYSTEMS",
    title: "Hybrid RAG observability & debugging",
    summary: "Hybrid retrieval diagnostics, source citations, and answer grounding.",
  },
  {
    key: "assistant",
    stamp: "CONVERSATIONAL GENAI",
    title: "Policy & claims assistant",
    summary: "Natural language over policy documents and structured records.",
  },
  {
    key: "decs",
    stamp: "DOCUMENT AI",
    title: "DECS document extraction engine",
    summary: "OCR extraction with review, exceptions, and ledger synchronization.",
  },
];

export const additionalProjects: ProjectSummary[] = [
  {
    key: "kla",
    stamp: "SEMICONDUCTOR ANALYTICS",
    title: "KLA inspection analytics (KAI)",
    summary: "Interactive wafer defect analysis designed to explore large inspection datasets.",
  },
  {
    key: "energyya",
    stamp: "INVOICE AUTOMATION",
    title: "Energyya invoice automation",
    summary: "Invoice processing and analytics using Azure AI Document Intelligence.",
  },
  {
    key: "hpe",
    stamp: "FULL-STACK MODERNIZATION",
    title: "HPE Technomics customer portal",
    summary: "Modernizing a legacy .NET MVC portal toward .NET Web API and React.",
  },
];

export const allProjects = [...featuredProjects, ...additionalProjects];

export const toolkitGroups = [
  {
    group: "AI & AGENTS",
    skills: ["Azure OpenAI", "Microsoft Foundry", "Gemini", "Groq", "AI agents"],
  },
  {
    group: "RETRIEVAL & DOCUMENT AI",
    skills: [
      "Hybrid search",
      "BM25",
      "Embeddings",
      "RRF",
      "Azure AI Search",
      "Document Intelligence",
    ],
  },
  {
    group: "ENGINEERING",
    skills: ["Python", "FastAPI", "C# / .NET", "React", "TypeScript", "Angular"],
  },
  {
    group: "DATA & DELIVERY",
    skills: ["PostgreSQL", "SQL Server", "Azure Functions", "Docker", "GitHub", "Azure DevOps"],
  },
] as const satisfies readonly { group: string; skills: readonly PortfolioIconName[] }[];

export const articles = [
  {
    title: "RAG answered. The investigation began.",
    date: "RAG · DEBUGGING",
    summary:
      "A look at the work that starts after a RAG system returns an answer: tracing the evidence, retrieval choices, and failure points behind it.",
    href: "https://www.linkedin.com/pulse/rag-answered-investigation-began-sakthivel-ganesan-ypfbc/",
  },
  {
    title: "Your RAG system doesn’t need vector everything",
    date: "RAG · ARCHITECTURE",
    summary:
      "A practical argument for choosing retrieval methods around the corpus and the user, instead of adding vectors by default.",
    href: "https://www.linkedin.com/pulse/your-rag-system-doesnt-need-vector-everything-sakthivel-ganesan-aeogc/",
  },
  {
    title: "The more I learn about Microsoft Foundry, the less I think it’s an AI platform",
    date: "MICROSOFT FOUNDRY · SYSTEMS",
    summary:
      "How the supporting engineering layer around models—knowledge, agents, evaluation, observability, and governance—changes the way to think about Foundry.",
    href: "https://www.linkedin.com/pulse/more-i-learn-microsoft-foundry-less-think-its-ai-platform-ganesan-gskdc/",
  },
  {
    title: "We accidentally built software for humans. Now we’re rebuilding it for intelligence.",
    date: "MCP · SOFTWARE DESIGN",
    summary:
      "A perspective on software interfaces evolving from graphical interfaces and APIs toward capabilities that AI systems can understand and use.",
    href: "https://www.linkedin.com/pulse/we-accidentally-built-software-humans-now-were-sakthivel-ganesan-a7otc/",
  },
  {
    title:
      "Hands-on with Microsoft Foundry: Building, Orchestrating, and Consuming My First AI Agent",
    date: "AI AGENTS · BUILD LOG",
    summary:
      "A hands-on walkthrough from Foundry setup and agent orchestration to consuming an agent inside a full-stack application.",
    href: "https://www.linkedin.com/pulse/hands-on-microsoft-foundry-building-orchestrating-my-first-ganesan-pxfcc/",
  },
] as const;
