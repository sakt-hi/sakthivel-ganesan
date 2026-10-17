import type { ChangeEvent } from "react";
import { Palette } from "lucide-react";
import type { Theme } from "@/app/types/portfolio";
import { themeOptions } from "@/app/data/themes";

type PortfolioHeaderProps = {
  theme: Theme;
  mobileFilesOpen: boolean;
  onThemeChange: (theme: Theme) => void;
  onSearch: () => void;
  onToggleFiles: () => void;
};

export function PortfolioHeader({
  theme,
  mobileFilesOpen,
  onThemeChange,
  onSearch,
  onToggleFiles,
}: PortfolioHeaderProps) {
  const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) =>
    onThemeChange(event.target.value as Theme);

  return (
    <header className="chrome">
      <a className="identity" href="#workspace" aria-label="Sakthivel Ganesan home">
        <span className="prompt-mark">&gt;_</span> sakthivel
        <span className="identity-dim">@ai-lab</span>
      </a>
      <div className="chrome-center">
        <span className="traffic">
          <i />
          <i />
          <i />
        </span>
        <span>~/portfolio — zsh</span>
      </div>
      <div className="chrome-right">
        <span className="live-indicator" /> available for thoughtful work
      </div>
      <button
        className="global-search"
        type="button"
        aria-label="Search portfolio sections and projects"
        onClick={onSearch}
      >
        <span>
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.3" />
            <path d="m15.5 15.5 5 5" />
          </svg>
        </span>{" "}
        Search sections &amp; projects <kbd>⌘K</kbd>
      </button>
      <label className="theme-picker">
        <span className="theme-label">THEME</span>
        <span className="theme-icon" aria-hidden="true">
          <Palette size={17} strokeWidth={1.8} />
        </span>
        <select aria-label="Choose color theme" value={theme} onChange={handleThemeChange}>
          <optgroup label="Dark themes">
            {themeOptions
              .filter((option) => option.mode === "dark")
              .map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
          </optgroup>
          <optgroup label="Light themes">
            {themeOptions
              .filter((option) => option.mode === "light")
              .map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
          </optgroup>
        </select>
      </label>
      <button
        className="mobile-files"
        type="button"
        aria-label={mobileFilesOpen ? "Close portfolio menu" : "Open portfolio menu"}
        aria-expanded={mobileFilesOpen}
        aria-controls="file-tree"
        onClick={onToggleFiles}
      >
        <span className="hamburger-icon" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
    </header>
  );
}
