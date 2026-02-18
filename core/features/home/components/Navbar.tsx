'use client';

import { Bookmark, HomeIcon, MessageCircle, PlusCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/core/utils/utils";
import { fullWidthClassName } from "react-remove-scroll-bar";

const navItems = [
    { label: "خانه", href: "/", icon: <HomeIcon className="size-5" /> },
    { label: "نشان ها", href: "/bookmarks", icon: <Bookmark className="size-5" /> },
    { label: "ثبت آگهی", href: "/new", icon: <PlusCircle className="size-5" /> },
    { label: "چت و تماس", href: "/chat", icon: <MessageCircle className="size-5" /> },
    { label: "پروفایل", href: "/profile", icon: <User className="size-5" /> },
];

const trimSlashes = 
(url: string): string => url.replace(/^\/+|\/+$/g, "");

const isActivePath = (currentPath: string, targetHref: string): boolean => {
    const cleanCurrent = trimSlashes(currentPath);
    const cleanTarget = trimSlashes(targetHref);

    if (cleanTarget === "") {
        return cleanCurrent === "";
    }

    return cleanCurrent === cleanTarget || cleanCurrent.startsWith(`${cleanTarget}/`);
};

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="pt-16">
            <nav className={cn(fullWidthClassName, "fixed bottom-0 left-0 right-0")}>
                <div className="container-page min-h-0 border-t border-accent/20 bg-background px-0">
                    <div className="flex justify-between items-center h-16">
                        {navItems.map((item) => {
                            const isActive = isActivePath(pathname, item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1 w-full h-full text-xs transition-colors",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
}
