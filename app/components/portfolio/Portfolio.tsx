"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { fileInfo, getFileIconClass, navigationGroups } from "@/app/data/navigation";
import DocumentRenderer from "@/app/components/portfolio/DocumentRenderer";
import { isTheme, themeOptions } from "@/app/data/themes";
import { PortfolioHeader } from "@/app/components/portfolio/PortfolioHeader";
import { PortfolioSidebar } from "@/app/components/portfolio/PortfolioSidebar";
import { SearchPalette } from "@/app/components/portfolio/SearchPalette";
import type { CommandEntry, FileKey, Theme } from "@/app/types/portfolio";

export default function Portfolio() {
  const [active, setActive] = useState<FileKey>("home");
  const [theme, setTheme] = useState<Theme>("terminal");
  const [mobileFilesOpen, setMobileFilesOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [traceStep, setTraceStep] = useState(0);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([
    {
      command: "cat README.md",
      output: "Choose a file to explore, or type help for a few shortcuts.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const current = fileInfo[active];
  const themeMode = themeOptions.find((option) => option.id === theme)?.mode ?? "dark";

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved && isTheme(saved)) {
      const restoreTheme = window.setTimeout(() => setTheme(saved), 0);
      return () => window.clearTimeout(restoreTheme);
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight;
  }, [history]);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const openFile = (key: FileKey, record = true) => {
    setActive(key);
    if (key === "projects") setShowMoreProjects(false);
    setMobileFilesOpen(false);
    if (record)
      setHistory((items) => [...items, { output: `opened ${fileInfo[key].name}` }].slice(-24));
  };

  const runCommand = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    const [verb, ...args] = text.toLowerCase().split(/\s+/);
    const target = args.join(" ").replace(/^\.\//, "");
    const normalized = target.replace(/^work\//, "");
    const byName = (Object.keys(fileInfo) as FileKey[]).find(
      (key) =>
        fileInfo[key].name.toLowerCase() === normalized ||
        fileInfo[key].name.toLowerCase() === normalized.split("/").pop(),
    );
    let output = "";
    let next: FileKey | undefined;

    if (verb === "help" || verb === "man")
      output =
        "Commands: ls · open about_me.md · projects · principles · stack · experience · education · articles · contact · clear";
    else if (verb === "ls" || verb === "tree")
      output =
        "Overview · About · Toolkit · Selected work · Engineering principles · Experience · Education · Articles · Contact";
    else if (verb === "about" || verb === "whoami") next = "about";
    else if (verb === "work" || verb === "projects") next = "projects";
    else if (verb === "principles" || verb === "approach") next = "approach";
    else if (verb === "stack") next = "stack";
    else if (verb === "experience") next = "experience";
    else if (verb === "education") next = "education";
    else if (verb === "articles" || verb === "writing") next = "articles";
    else if (verb === "contact" || verb === "email") next = "contact";
    else if (verb === "open" || verb === "cat" || verb === "cd") {
      next = byName || (["rag", "hybrid_rag.py"].includes(normalized) ? "rag" : undefined);
      if (!next) output = `No file named “${target}”. Try ls to see what’s here.`;
    } else if (verb === "clear" || verb === "cls") {
      setHistory([]);
      setCommand("");
      return;
    } else output = `Command not found: ${verb}. Type help to see what you can try.`;

    setHistory((items) =>
      [
        ...items,
        {
          command: text,
          output: output || `opened ${next ? fileInfo[next].name : ""}`,
        },
      ].slice(-24),
    );
    setCommand("");
    setTerminalOpen(true);
    if (next) openFile(next, false);
  };

  const submitCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(command);
  };
  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setSearchOpen(true);
    }
    if ((event.metaKey || event.ctrlKey) && ["1", "2"].includes(event.key)) {
      event.preventDefault();
      openFile(event.key === "1" ? "home" : "projects");
    }
    if (event.key === "/" && !(event.target instanceof HTMLInputElement)) {
      event.preventDefault();
      inputRef.current?.focus();
    }
    if (event.key === "Escape") {
      setMobileFilesOpen(false);
      setRightPanelOpen(false);
      setSearchOpen(false);
    }
  };

  const searchable = (Object.keys(fileInfo) as FileKey[]).map((key) => ({
    key,
    label:
      navigationGroups.flatMap((group) => group.items).find((item) => item.key === key)?.label ||
      fileInfo[key].name,
    detail: fileInfo[key].name,
  }));
  const searchResults = searchable.filter((item) =>
    `${item.label} ${item.detail}`.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const selectSearchResult = (key: FileKey) => {
    openFile(key);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchIndex(0);
  };

  return (
    <div className={`desktop theme-${theme} theme-${themeMode}`} onKeyDown={handleKey}>
      <a className="skip-link" href="#workspace">
        Skip to workspace
      </a>
      <PortfolioHeader
        theme={theme}
        mobileFilesOpen={mobileFilesOpen}
        onThemeChange={setTheme}
        onSearch={() => setSearchOpen(true)}
        onToggleFiles={() => setMobileFilesOpen((open) => !open)}
      />
      <div className="workbench" id="workspace">
        <PortfolioSidebar
          active={active}
          mobileFilesOpen={mobileFilesOpen}
          showMoreProjects={showMoreProjects}
          onOpenFile={openFile}
          onClose={() => setMobileFilesOpen(false)}
          setShowMoreProjects={setShowMoreProjects}
        />
        <main className="editor-shell">
          <div className="tabbar" role="tablist" aria-label="Open file">
            <button
              className="tab active"
              role="tab"
              aria-selected="true"
              type="button"
              onClick={() => openFile(active, false)}
            >
              <span className={`file-icon ${getFileIconClass(current.kind)}`}>{current.icon}</span>
              {current.name}
              <b>×</b>
            </button>
            <div className="tabbar-space" />
            <button
              className="editor-action inspector-toggle"
              type="button"
              onClick={() => setRightPanelOpen((open) => !open)}
              aria-label={
                rightPanelOpen ? "Hide AI systems inspector" : "Show AI systems inspector"
              }
              aria-expanded={rightPanelOpen}
            >
              ◈<span> Inspector</span>
            </button>
          </div>
          <div className="breadcrumbs">
            <span>sakthivel@ai-lab</span>
            <span>/</span>
            <span>{current.name}</span>
            <span className="crumb-right">UTF-8&nbsp;&nbsp; {current.kind}</span>
          </div>
          <article className="editor-content" key={active} tabIndex={-1}>
            <DocumentRenderer
              active={active}
              openFile={openFile}
              openInspector={() => setRightPanelOpen(true)}
              showMoreProjects={showMoreProjects}
              revealProjects={() => setShowMoreProjects(true)}
            />
          </article>
          <section
            className={`terminal ${terminalOpen ? "expanded" : ""}`}
            aria-label="Optional command prompt"
          >
            <div className="terminal-tabs">
              <button
                className="terminal-tab selected terminal-toggle"
                type="button"
                aria-expanded={terminalOpen}
                onClick={() => setTerminalOpen((open) => !open)}
              >
                {terminalOpen ? "⌄" : "›"}&nbsp; COMMAND LINE
              </button>
              <button type="button" className="quick-command" onClick={() => runCommand("help")}>
                help
              </button>
              <button type="button" className="quick-command" onClick={() => runCommand("work")}>
                projects
              </button>
              <button type="button" className="quick-command" onClick={() => runCommand("contact")}>
                contact
              </button>
              <span className="terminal-spacer" />
              <span className="terminal-status">
                <i /> ready
              </span>
            </div>
            {terminalOpen && (
              <div className="terminal-history" ref={historyRef} aria-live="polite">
                {history.map((entry, index) => (
                  <div className="history-entry" key={`${index}-${entry.command || entry.output}`}>
                    {entry.command && (
                      <div className="history-line">
                        <span className="shell-prompt">sakthivel@ai-lab:~$</span>
                        <span> {entry.command}</span>
                      </div>
                    )}
                    <div className="history-note">{entry.output}</div>
                  </div>
                ))}
              </div>
            )}
            <form className="command-line" onSubmit={submitCommand}>
              <label className="shell-prompt" htmlFor="command-input">
                sakthivel@ai-lab:~$
              </label>
              <input
                id="command-input"
                ref={inputRef}
                value={command}
                onFocus={() => setTerminalOpen(true)}
                onChange={(event) => setCommand(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                placeholder="Type a command, or use the portfolio map above"
              />
              <button className="run-command" type="submit" aria-label="Run command">
                ↵
              </button>
            </form>
          </section>
          <footer className="statusbar">
            <span>
              <b>◉</b> Sakthivel · AI engineer
            </span>
            <span>Chennai, India</span>
            <span className="status-spacer" />
            <span>⌘K search</span>
            <span>{current.kind}</span>
          </footer>
        </main>
        <aside
          className={`system-panel ${rightPanelOpen ? "open" : "collapsed"}`}
          aria-label="AI systems inspector"
        >
          <div className="panel-top">
            <span>AI SYSTEMS / INSPECTOR</span>
            <button
              type="button"
              aria-label="Close system overview"
              onClick={() => setRightPanelOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="panel-block identity-block">
            <div className="avatar-mark">
              SG<span>_</span>
            </div>
            <div>
              <b>Sakthivel Ganesan</b>
              <small>Senior software engineer</small>
            </div>
          </div>
          <div className="panel-block">
            <div className="block-label">
              CURRENT FOCUS <span>●</span>
            </div>
            <p className="focus-title">Grounded generative AI</p>
            <p className="focus-copy">
              RAG systems, agent workflows, and the software around them.
            </p>
          </div>
          <div className="panel-block trace-block">
            <div className="block-label">
              RETRIEVAL TRACE <span className="trace-run">ILLUSTRATIVE</span>
            </div>
            <div className="trace-question">“Where did this answer come from?”</div>
            <p className="trace-instruction">Select a stage to inspect what happens.</p>
            {["Hybrid search", "Rank fusion", "Source evidence"].map((name, index) => (
              <div key={name}>
                <button
                  className={`trace-row trace-button ${traceStep === index ? "selected" : ""}`}
                  type="button"
                  aria-pressed={traceStep === index}
                  onClick={() => setTraceStep(index)}
                >
                  <span className={`trace-node ${index === 2 ? "source" : ""}`}>
                    {index === 0 ? "⌕" : index === 1 ? "⇄" : "▤"}
                  </span>
                  <span className="trace-row-copy">
                    <b>{name}</b>
                    <small>
                      {index === 0
                        ? "Dense + BM25"
                        : index === 1
                          ? "Reciprocal rank fusion"
                          : "Page · chunk citation"}
                    </small>
                  </span>
                  <em>{index === 2 ? "✓" : index === 0 ? "↗" : "↔"}</em>
                </button>
                {index < 2 && <div className="trace-connector" />}
              </div>
            ))}
            <div className="trace-explanation">
              {traceStep === 0
                ? "Vector similarity finds semantically related passages. BM25 adds exact keyword matches."
                : traceStep === 1
                  ? "Reciprocal Rank Fusion combines the two rankings so useful results from either path can surface."
                  : "The selected chunk stays linked to its source page so the generated answer can be checked against evidence."}
            </div>
            <div className="trace-foot">
              <span>retrieval → evidence → answer</span>
            </div>
          </div>
          <div className="panel-block capabilities">
            <div className="block-label">SYSTEMS I WORK IN</div>
            <div className="focus-tags">
              <span>Retrieval &amp; RAG</span>
              <span>AI agents</span>
              <span>Full-stack systems</span>
              <span>Azure AI</span>
            </div>
          </div>
          <div className="panel-bottom">
            <a href="mailto:sakthivel.ganesan@hotmail.com">
              Start a conversation <span>↗</span>
            </a>
            <span>Chennai · India</span>
          </div>
        </aside>
      </div>
      {searchOpen && (
        <SearchPalette
          inputRef={searchRef}
          query={searchQuery}
          results={searchResults}
          selectedIndex={searchIndex}
          onQueryChange={(query) => {
            setSearchQuery(query);
            setSearchIndex(0);
          }}
          onSelectedIndexChange={setSearchIndex}
          onSelect={selectSearchResult}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </div>
  );
}
