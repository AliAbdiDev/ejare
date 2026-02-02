"use client"

import { Button } from "@/core/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/core/components/ui/drawer";
import { Input } from "@/core/components/ui/input";
import { cn } from "@/core/utils/utils";
import { ArrowRight, Car, CassetteTapeIcon, ChevronLeft, LucideProps, Search, TabletSmartphone, Tv2, X } from "lucide-react";
import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction, useMemo, useState } from "react";

const SearchInput = ({ className }: { className?: string }) => {

    return (
        <div className={cn('relative', className)}>
            <Input type="text" className="peer h-10" />
            <span className="absolute left-2 inset-y-[25%] text-muted/50 peer-focus-within:text-muted duration-200">
                <Search className=" size-[17px]" />
            </span>
        </div>
    )
}

interface DrawerFiltersProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

type CategoryKeys = 'all' | "digital"

interface Category {
    name: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    key?: CategoryKeys;
    validFilters?: boolean;
}

const CATEGORYS: { catName: string, key: CategoryKeys, isSubCat?: boolean, categorys: Category[] }[] = [
    {
        catName: 'همه آگهی ها',
        key: 'all',
        categorys: [
            {
                name: 'لوازم خودرو',
                icon: Car,
            },
            {
                name: "رایانه",
                icon: Tv2,
            },
            {
                name: "صوتی و تصویری",
                icon: CassetteTapeIcon,
            },
            {
                key: 'digital',
                name: "کالای دیجیتال",
                icon: TabletSmartphone
            }
        ]
    },
    {
        catName: 'دیجیتال',
        key: 'digital',
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

        ]
    },
    {
        catName: 'دیجیتال',
        key: 'digital',
        categorys: [
            {
                name: "رایانه",
                icon: Tv2,
            },
            {
                name: "صوتی و تصویری",
                icon: CassetteTapeIcon,
            },

        ]
    },

]

const DrawerFilters = ({ open, setOpen }: DrawerFiltersProps) => {

    const [categoryKey, setCategoryKey] = useState<CategoryKeys | null>('all')
    const [beforCategoryKey, setBeforCategoryKey] = useState<CategoryKeys | null>()

    const currentCategoryFinded = useMemo(() => {
        if (!categoryKey) return;
        return CATEGORYS.find((cat) => categoryKey === cat?.key)
    }, [categoryKey])

    return (
        <Drawer open={open} onOpenChange={setOpen} closeThreshold={0.6}>
            <DrawerContent className="min-h-[75vh]">
                <DrawerHeader className="relative border-b">
                    <Button type="button" size={'icon'} className="bg-white/20 absolute right-3 top-[9px]"
                        onClick={() => {
                            if (!currentCategoryFinded?.isSubCat) {
                                setOpen(false)
                            } else {
                                setCategoryKey(beforCategoryKey || null)
                            }
                        }}>
                        {
                            !currentCategoryFinded?.isSubCat ? <X /> : <ArrowRight />
                        }
                    </Button>
                    <DrawerTitle className="font-iransans-bold w-full text-center">{currentCategoryFinded?.catName}</DrawerTitle>
                </DrawerHeader>

                <ul className="px-4 pt-6 space-y-2.5">
                    {
                        currentCategoryFinded?.categorys?.map((item, index) => (
                            <li
                                className=" p-2.5 rounded-lg bg-white/20 text-sm flex items-center justify-between cursor-pointer"
                                onClick={() => {
                                    setBeforCategoryKey(currentCategoryFinded?.key)

                                    setCategoryKey(item?.key || null)
                                }} key={index}
                            >

                                <div className="flex items-center gap-2  font-iransans-light">
                                    <item.icon />
                                    <p>
                                        {item.name}
                                    </p>
                                </div>

                                {
                                    item?.key && <ChevronLeft className=" font-iransans-light" />
                                }
                            </li>
                        ))
                    }
                </ul>
            </DrawerContent>
        </Drawer>
    )
}

function Header() {
    const [open, setOpen] = useState(false)

    return (

        <>
            <header className="pb-12">
                <div className="fixed top-0 inset-0 z-10 h-12">
                    <div className="container-page min-h-0 border-b border-accent/20 bg-background">
                        <div className="flex justify-between items-center h-16">
                            <SearchInput className="w-full" />
                            <Button
                                variant={'outline'}
                                size={'sm'}
                                className="mr-3 h-10 font-iransans-bold text-xs text-muted/70"
                                onClick={() => { setOpen(true) }}
                            >
                                دسته بندی
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <DrawerFilters open={open} setOpen={setOpen} />
        </>

    );
}

export default Header;