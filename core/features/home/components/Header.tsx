"use client";

import { Button } from "@/core/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/core/components/ui/drawer";
import { HeaderSearchInput } from "@/core/features/home/components/header/HeaderSearchInput";
import { HeaderSearchPanel } from "@/core/features/home/components/header/HeaderSearchPanel";
import { useSearch } from "@/core/features/home/hooks/useSearch";
import { cn } from "@/core/utils/utils";
import {
  ArrowRight,
  Car,
  CassetteTapeIcon,
  ChevronLeft,
  LucideProps,
  TabletSmartphone,
  Tv2,
  X,
} from "lucide-react";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fullWidthClassName } from "react-remove-scroll-bar";

interface DrawerFiltersProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type CategoryKeys = "all" | "digital";

interface Category {
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  key?: CategoryKeys;
  validFilters?: boolean;
}

const CATEGORYS: {
  catName: string;
  key: CategoryKeys;
  isSubCat?: boolean;
  categorys: Category[];
}[] = [
  {
    catName: "همه آگهی ها",
    key: "all",
    categorys: [
      {
        name: "",
        icon: Car,
      },
      {
        name: "لوازم خودرو",
        icon: Tv2,
      },
      {
        name: "رایانه",
        icon: CassetteTapeIcon,
      },
      {
        key: "digital",
        name: "صوتی و تصویری",
        icon: TabletSmartphone,
      },
    ],
  },
  {
    catName: "دیجیتال",
    key: "digital",
    isSubCat: true,
    categorys: [
      {
        name: "رایانه",
        icon: Tv2,
      },
      {
        name: "صوتی و تصویری",
        icon: CassetteTapeIcon,
      },
    ],
  },
  {
    catName: "دیجیتال",
    key: "digital",
    categorys: [
      {
        name: "رایانه",
        icon: Tv2,
      },
      {
        name: "صوتی و تصویری",
        icon: CassetteTapeIcon,
      },
    ],
  },
];

const DrawerFilters = ({ open, setOpen }: DrawerFiltersProps) => {
  const [categoryKey, setCategoryKey] = useState<CategoryKeys | null>("all");
  const [beforCategoryKey, setBeforCategoryKey] =
    useState<CategoryKeys | null>();

  const currentCategoryFinded = useMemo(() => {
    if (!categoryKey) return;
    return CATEGORYS.find((cat) => categoryKey === cat?.key);
  }, [categoryKey]);

  return (
    <Drawer open={open} onOpenChange={setOpen} closeThreshold={0.6}>
      <DrawerContent className="min-h-[75vh] max-w-md m-auto">
        <DrawerHeader className="relative border-b">
          <Button
            type="button"
            size={"icon"}
            className="bg-white/20 absolute right-3 top-2.25"
            onClick={() => {
              if (!currentCategoryFinded?.isSubCat) {
                setOpen(false);
              } else {
                setCategoryKey(beforCategoryKey || null);
              }
            }}
          >
            {!currentCategoryFinded?.isSubCat ? <X /> : <ArrowRight />}
          </Button>
          <DrawerTitle className="font-iransans-bold w-full text-center">
            {currentCategoryFinded?.catName}
          </DrawerTitle>
        </DrawerHeader>

        <ul className="px-4 pt-6 space-y-2.5">
          {currentCategoryFinded?.categorys?.map((item, index) => (
            <li
              className=" p-2.5 rounded-lg bg-white/20 text-sm flex items-center justify-between cursor-pointer"
              onClick={() => {
                setBeforCategoryKey(currentCategoryFinded?.key);

                setCategoryKey(item?.key || null);
              }}
              key={index}
            >
              <div className="flex items-center gap-2  font-iransans-light">
                <item.icon />
                <p>{item.name}</p>
              </div>

              {item?.key && <ChevronLeft className=" font-iransans-light" />}
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

function Header() {
  const {
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
  } = useSearch();

  return (
    <>
      <header className="pb-16">
        <div
          className={cn(fullWidthClassName, "fixed top-0 inset-x-0 z-20 h-16")}
        >
          <div className="container-page min-h-0 border-b border-accent/20 bg-background">
            <div className={"flex h-16 items-center gap-4"}>
              {isSearchMode && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-5 shrink-0"
                  onClick={exitSearchMode}
                >
                  <ArrowRight className="size-5" />
                </Button>
              )}
              <HeaderSearchInput
                className="flex-1"
                value={searchQuery}
                onChange={setSearchQuery}
                onActivate={activateSearchMode}
                onSubmit={onSearchSubmit}
              />

              {!isSearchMode && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 shrink-0 font-iransans-bold text-xs text-muted/70"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  دسته بندی
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {isSearchMode ? (
        <div
          className={cn(
            fullWidthClassName,
            "fixed inset-x-0 top-16 bottom-0 z-10 bg-background max-w-md mx-auto",
          )}
        >
          <div className="mx-auto h-full max-w-md border-x border-accent/20 bg-background px-6 pb-24 pt-4">
            <HeaderSearchPanel
              shouldShowHistory={shouldShowHistory}
              searchHistory={searchHistory}
              clearHistory={clearHistory}
              removeSearch={removeSearch}
              onHistoryItemClick={onHistoryItemClick}
              isLoadingResults={isLoadingResults}
              showNoResultMessage={showNoResultMessage}
              searchResults={searchResults}
              onResultItemClick={onResultItemClick}
            />
          </div>
        </div>
      ) : null}

      <DrawerFilters open={open} setOpen={setOpen} />
    </>
  );
}

export default Header;
