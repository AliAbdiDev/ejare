import { cn } from "@/core/utils/utils"
import Image from "next/image"

interface LogoImageProps extends Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "className"> {
    classNameImage?: string
}

export const LogoImage = ({ classNameImage, ...props }: LogoImageProps) => {
    return <Image
        priority
        unoptimized
        width={220}
        height={200}
        {...props}
        src="/common/logo.png"
        alt="logo"
        className={classNameImage||''}
    />
}