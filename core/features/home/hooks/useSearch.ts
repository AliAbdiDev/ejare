"use client";

import { useEffect } from "react";
import { mockSearchApi } from "@/core/features/home/mock/search";
import { useHeaderSearchStore } from "@/core/features/home/store/useHeaderSearchStore";
import { useSearchHistoryStore } from "@/core/features/home/store/useSearchHistoryStore";

export const useSearch = () => {
  const open = useHeaderSearchStore.useOpen();
  const isSearchMode = useHeaderSearchStore.useIsSearchMode();
  const searchQuery = useHeaderSearchStore.useSearchQuery();
  const searchResults = useHeaderSearchStore.useSearchResults();
  const isLoadingResults = useHeaderSearchStore.useIsLoadingResults();
  const hasSearchError = useHeaderSearchStore.useHasSearchError();

  const setOpen = useHeaderSearchStore.useSetOpen();
  const setSearchQuery = useHeaderSearchStore.useSetSearchQuery();
  const setSearchResults = useHeaderSearchStore.useSetSearchResults();
  const setIsLoadingResults = useHeaderSearchStore.useSetIsLoadingResults();
  const setHasSearchError = useHeaderSearchStore.useSetHasSearchError();
  const activateSearchMode = useHeaderSearchStore.useActivateSearchMode();
  const exitSearchMode = useHeaderSearchStore.useExitSearchMode();

  const searchHistory = useSearchHistoryStore((state) => state.history);
  const addSearch = useSearchHistoryStore((state) => state.addSearch);
  const removeSearch = useSearchHistoryStore((state) => state.removeSearch);
  const clearHistory = useSearchHistoryStore((state) => state.clearHistory);

  const trimmedSearchQuery = searchQuery.trim();
  const shouldShowHistory = trimmedSearchQuery.length === 0;

  useEffect(() => {
    if (!isSearchMode) return;

    if (!trimmedSearchQuery) {
      setIsLoadingResults(false);
      setHasSearchError(false);
      setSearchResults([]);
      return;
    }

    let cancelled = false;
    setIsLoadingResults(true);
    setHasSearchError(false);

    const timeout = setTimeout(async () => {
      try {
        const response = await mockSearchApi(trimmedSearchQuery);
        if (cancelled) return;

        setSearchResults(response);
        if (response.length > 0 && trimmedSearchQuery.length > 3) {
          addSearch(trimmedSearchQuery);
        }
      } catch {
        if (cancelled) return;

        setSearchResults([]);
        setHasSearchError(true);
      } finally {
        if (!cancelled) {
          setIsLoadingResults(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [
    addSearch,
    isSearchMode,
    setHasSearchError,
    setIsLoadingResults,
    setSearchResults,
    trimmedSearchQuery,
  ]);

  useEffect(() => {
    if (isSearchMode) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSearchMode]);

  const onSearchSubmit = () => {
    const value = trimmedSearchQuery;
    if (!value) return;
    setSearchQuery(value);
  };

  const onHistoryItemClick = (query: string) => {
    setSearchQuery(query);
    activateSearchMode();
  };

  const onResultItemClick = (query: string) => {
    setSearchQuery(query);
  };

  const showNoResultMessage =
    !shouldShowHistory &&
    !isLoadingResults &&
    (hasSearchError || searchResults.length === 0);

  return {
    open,
    setOpen,
    isSearchMode,
    searchQuery,
    setSearchQuery,
    activateSearchMode,
    exitSearchMode,
    onSearchSubmit,
    searchHistory,
    clearHistory,
    removeSearch,
    onHistoryItemClick,
    isLoadingResults,
    showNoResultMessage,
    searchResults,
    onResultItemClick,
    shouldShowHistory,
  };
};
