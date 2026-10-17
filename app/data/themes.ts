import type { Theme } from "@/app/types/portfolio";

export type ThemeOption = {
  id: Theme;
  label: string;
  mode: "dark" | "light";
};

export const themeOptions: readonly ThemeOption[] = [
  { id: "terminal", label: "Terminal", mode: "dark" },
  { id: "ocean", label: "Ocean", mode: "dark" },
  { id: "forest", label: "Forest", mode: "dark" },
  { id: "midnight", label: "Midnight", mode: "dark" },
  { id: "ember", label: "Ember", mode: "dark" },
  { id: "cloud", label: "Cloud", mode: "light" },
  { id: "mint", label: "Mint", mode: "light" },
  { id: "lavender", label: "Lavender", mode: "light" },
  { id: "sand", label: "Sand", mode: "light" },
  { id: "rose", label: "Rose", mode: "light" },
] as const;

export const isTheme = (value: string): value is Theme =>
  themeOptions.some((theme) => theme.id === value);
