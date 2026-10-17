import type { RefObject, KeyboardEvent } from "react";
import type { SearchResult } from "@/app/types/portfolio";

type SearchPaletteProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  query: string;
  results: SearchResult[];
  selectedIndex: number;
  onQueryChange: (query: string) => void;
  onSelectedIndexChange: (index: (current: number) => number) => void;
  onSelect: (key: SearchResult["key"]) => void;
  onClose: () => void;
};

export function SearchPalette({
  inputRef,
  query,
  results,
  selectedIndex,
  onQueryChange,
  onSelectedIndexChange,
  onSelect,
  onClose,
}: SearchPaletteProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onSelectedIndexChange((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      onSelectedIndexChange((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && results[selectedIndex]) {
      event.preventDefault();
      onSelect(results[selectedIndex].key);
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="search-scrim"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
      >
        <div className="search-heading">
          <span id="search-title">Go anywhere</span>
          <kbd>ESC</kbd>
        </div>
        <label className="search-input-wrap">
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search projects, experience, toolkit…"
            aria-label="Search portfolio"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={
              results[selectedIndex] ? `search-option-${results[selectedIndex].key}` : undefined
            }
          />
        </label>
        <div className="search-results" id="search-results" role="listbox">
          {results.map((item, index) => (
            <button
              className={selectedIndex === index ? "selected" : ""}
              id={`search-option-${item.key}`}
              role="option"
              aria-selected={selectedIndex === index}
              key={item.key}
              type="button"
              onMouseEnter={() => onSelectedIndexChange(() => index)}
              onClick={() => onSelect(item.key)}
            >
              <span>{item.label}</span>
              <small>{item.detail}</small>
              <b>↵</b>
            </button>
          ))}
          {results.length === 0 && (
            <p>No matching sections. Try “RAG”, “experience”, or “contact”.</p>
          )}
        </div>
        <div className="search-footer">
          <span>Search is local to this portfolio</span>
          <span>↑ ↓ move · enter open</span>
        </div>
      </section>
    </div>
  );
}
