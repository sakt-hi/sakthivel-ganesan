# Sakthivel Ganesan — AI Engineer

A personal portfolio built to show how I think about AI systems, not just list the tools I use. Explore my work through an interactive, editor-inspired workspace covering retrieval-augmented generation, AI agents, document intelligence, and full-stack engineering.

**LinkedIn:** [sakthivel-g](https://www.linkedin.com/in/sakthivel-g/) · **GitHub:** [sakt-hi](https://github.com/sakt-hi)

## What makes it different

- **An interactive workspace:** navigate projects, experience, writing, education, and engineering principles through a file-tree interface.
- **Project case studies:** inspect the problem, system approach, implementation details, and technologies behind selected work.
- **A retrieval trace inspector:** step through an illustrative RAG flow to see how retrieval, grounding, and evidence fit together.
- **A command palette and terminal:** search with `⌘K` / `Ctrl+K`, or use the optional command line for quick navigation.
- **Ten editor-inspired themes:** choose from five dark and five light palettes. Your selection is saved in the browser.
- **Responsive layout:** the workspace adapts to smaller screens, with navigation and inspector controls available on mobile.

## Built with

- Next.js App Router and React
- TypeScript
- Sass modules organized into tokens, layout, components, documents, themes, and responsive styles
- Lucide and Simple Icons for interface and technology marks
- Vercel hosting

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful commands

```sh
npm run lint         # ESLint
npm run typecheck    # TypeScript validation
npm run format       # Format the project with Prettier
npm run format:check # Check formatting
npm run build        # Create the production Next.js build
npm start            # Run the production build locally
```

## Project structure

```text
app/
  components/
    icons/       Shared icon registry
    portfolio/  Workspace, navigation, search, and portfolio views
    ui/          Reusable Button and Card components
  data/          Portfolio content, navigation, and theme definitions
  styles/        Sass tokens and layered component styles
  types/         Shared TypeScript models
```

Portfolio copy, project details, tools, and articles are maintained in `app/data/content.ts`. Navigation labels and file metadata live in `app/data/navigation.ts`; the ten theme palettes are defined in `app/styles/themes/_themes.scss`.
