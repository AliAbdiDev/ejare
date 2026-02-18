import { Avatar, AvatarImage } from "@/core/components/ui/avatar";
import { Button } from "@/core/components/ui/button";
import { Item, ItemDescription, ItemTitle } from "@/core/components/ui/item";
import Navbar from "@/core/features/home/components/Navbar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowLeft, Bell, ChevronLeft, GavelIcon, Info, Instagram, LogOut, LucideProps, MessageCircleMoreIcon, Twitter, UserPlus2Icon } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

const ItemProfile = ({ children }: { children: ReactNode }) => {
    return <Item className="justify-between bg-muted/20 rounded-xl py-2 text-muted-foreground">{children}</Item>
}

const ListItemProfile = ({ listData }: { listData: Array<{ title?: string, description?: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> }> }) => {
    return listData?.map((item, i) => (
        <ItemProfile key={i}>
            <div className="flex items-center gap-2">
                <item.icon className="size-5" />
                <div className="space-y-1">
                    <ItemTitle>{item?.title}</ItemTitle>
                    <ItemDescription>{item?.description}</ItemDescription>
                </div>
            </div>

            <Button variant={'ghost'} size={'sm'}><ChevronLeft /></Button>
        </ItemProfile>)
    )
}

const listDataProfile = [
    { description: 'اعلانات', icon: Bell },
    { description: 'دعوت از دوستان', icon: UserPlus2Icon },
    { description: 'درباره ما', icon: Info },
    { description: 'قوانین', icon: GavelIcon },
    { description: 'پشتیبانی', icon: MessageCircleMoreIcon }
];

export default function Page() {

    return (
        <>
            <div className="flex flex-col size-full gap-3 justify-between">
                <Item className="justify-between bg-muted/20 rounded-xl mb-2 py-3">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-11 text-center  bg-muted/20">
                            <AvatarImage />
                            <AvatarFallback className="text-xs">profile</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <ItemTitle className="mr-0.5">نام پروفایل</ItemTitle>
                            <ItemDescription>09030565361</ItemDescription>
                        </div>
                    </div>

                    <Button variant={'link'} size={'sm'}>ویرایش<ArrowLeft /></Button>
                </Item>

                <ListItemProfile listData={listDataProfile} />

                <Button className="bg-muted/20 text-red-400 mt-2 hover:bg-red-100/20" size={'lg'} > <LogOut />خروج از حساب کاربری</Button>
            </div>

            <ul className="w-full flex items-center justify-center gap-5 mt-7 text-muted/70">
                <li className=""><Twitter className="size-5" /></li>
                <li className=""> <Instagram className="size-5" /></li>
            </ul>
            <Navbar />
        </>
    );
}