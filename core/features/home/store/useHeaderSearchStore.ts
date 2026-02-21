"use client";

import { create } from "zustand";
import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { MockSearchResult } from "@/core/features/home/mock/search";

type HeaderSearchState = {
  open: boolean;
  isSearchMode: boolean;
  searchQuery: string;
  searchResults: MockSearchResult[];
  isLoadingResults: boolean;
  hasSearchError: boolean;
};

type HeaderSearchActions = {
  setOpen: (open: boolean) => void;
  setIsSearchMode: (isSearchMode: boolean) => void;
  setSearchQuery: (searchQuery: string) => void;
  setSearchResults: (searchResults: MockSearchResult[]) => void;
  setIsLoadingResults: (isLoadingResults: boolean) => void;
  setHasSearchError: (hasSearchError: boolean) => void;
  activateSearchMode: () => void;
  exitSearchMode: () => void;
};

type HeaderSearchStore = HeaderSearchState & HeaderSearchActions;

const useHeaderSearchStoreBase = create<HeaderSearchStore>((set) => ({
  open: false,
  isSearchMode: false,
  searchQuery: "",
  searchResults: [],
  isLoadingResults: false,
  hasSearchError: false,
  setOpen: (open) => set({ open }),
  setIsSearchMode: (isSearchMode) => set({ isSearchMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setIsLoadingResults: (isLoadingResults) => set({ isLoadingResults }),
  setHasSearchError: (hasSearchError) => set({ hasSearchError }),
  activateSearchMode: () => set({ isSearchMode: true, open: false }),
  exitSearchMode: () =>
    set({
      isSearchMode: false,
      searchQuery: "",
      searchResults: [],
      isLoadingResults: false,
      hasSearchError: false,
    }),
}));

export const useHeaderSearchStore = createSelectorHooks(useHeaderSearchStoreBase);
