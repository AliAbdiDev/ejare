import { Button } from "@/core/components/ui/button";
import { MockSearchResult } from "@/core/features/home/mock/search";
import { X } from "lucide-react";

type HeaderSearchPanelProps = {
  shouldShowHistory: boolean;
  searchHistory: string[];
  clearHistory: () => void;
  removeSearch: (query: string) => void;
  onHistoryItemClick: (query: string) => void;
  isLoadingResults: boolean;
  showNoResultMessage: boolean;
  searchResults: MockSearchResult[];
  onResultItemClick: (query: string) => void;
};

export const HeaderSearchPanel = ({
  shouldShowHistory,
  searchHistory,
  clearHistory,
  removeSearch,
  onHistoryItemClick,
  isLoadingResults,
  showNoResultMessage,
  searchResults,
  onResultItemClick,
}: HeaderSearchPanelProps) => {
  if (shouldShowHistory) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-iransans-bold">جستجوهای اخیر</p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={clearHistory}
            disabled={searchHistory.length === 0}
          >
            حذف همه
          </Button>
        </div>

        {searchHistory.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
            موردی یافت نشد.
          </p>
        ) : (
          <ul className="space-y-2">
            {searchHistory.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between rounded-xl border border-input/50 bg-input/15 px-3 py-2"
              >
                <button
                  type="button"
                  className="w-full truncate text-left text-sm"
                  onClick={() => onHistoryItemClick(item)}
                >
                  {item}
                </button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => removeSearch(item)}
                >
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
          <p className="text-sm font-iransans-bold">نتایج جستجو</p>

      {isLoadingResults ? (
        <p className="rounded-lg border border-input/50 p-4 text-sm text-muted-foreground">
          در حال جستجو...
        </p>
      ) : null}

      {showNoResultMessage ? (
        <p className="rounded-lg border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
          موردی یافت نشد.
        </p>
      ) : null}

      {!isLoadingResults && !showNoResultMessage ? (
        <ul className="space-y-2">
          {searchResults.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="w-full rounded-xl border border-input/50 bg-input/15 px-3 py-2 text-left"
                onClick={() => onResultItemClick(item.title)}
              >
                <p className="truncate text-sm">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.subtitle}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
