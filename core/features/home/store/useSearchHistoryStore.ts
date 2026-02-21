"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const SEARCH_HISTORY_LIMIT = 10;
const SEARCH_VALUE_MAX_LENGTH = 120;

const isValidSearchValue = (value: unknown): value is string => {
  if (typeof value !== "string") return false;

  const normalized = value.trim();
  if (!normalized) return false;
  if (normalized.length > SEARCH_VALUE_MAX_LENGTH) return false;

  return normalized !== "undefined" && normalized !== "null";
};

const sanitizeHistory = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  const normalized = value
    .filter((item): item is string => isValidSearchValue(item))
    .map((item) => item.trim());

  const deduped: string[] = [];
  for (const item of normalized) {
    if (deduped.some((entry) => entry.toLocaleLowerCase() === item.toLocaleLowerCase())) {
      continue;
    }
    deduped.push(item);
  }

  return deduped.slice(0, SEARCH_HISTORY_LIMIT);
};

type SearchHistoryStore = {
  history: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearHistory: () => void;
};

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    (set) => ({
      history: [],
      addSearch: (query) =>
        set((state) => {
          if (!isValidSearchValue(query)) return state;
          const value = query.trim();

          const nextHistory = [
            value,
            ...state.history.filter(
              (item) => item.toLocaleLowerCase() !== value.toLocaleLowerCase()
            ),
          ].slice(0, SEARCH_HISTORY_LIMIT);

          return { history: nextHistory };
        }),
      removeSearch: (query) =>
        set((state) => ({
          history: state.history.filter((item) => item !== query),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "home-search-history-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ history: state.history }),
      merge: (persistedState, currentState) => {
        const incomingHistory =
          persistedState &&
          typeof persistedState === "object" &&
          "history" in persistedState
            ? (persistedState as { history?: unknown }).history
            : [];

        return {
          ...currentState,
          history: sanitizeHistory(incomingHistory),
        };
      },
    }
  )
);
