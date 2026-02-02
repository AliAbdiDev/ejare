'use client';

import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/core/components/ui/input-otp";
import { useId } from "react";
import { useSessionStorage } from "@/core/hooks/useSessionStorage";
import { cn } from "@/core/utils/utils";
import CountdownTimer from "@/core/features/auth/components/CountdownTimer";
import { actionAuthOtp } from "@/app/auth";

const schema = z.object({
    otp: z
        .string()
        .length(5, { message: "کد تأیید باید ۵ رقم باشد." })
        .regex(/^\d{5}$/, { message: "فقط عدد مجاز است." }),
});

type FormData = z.infer<typeof schema>;

export default function OTPPage() {
    const router = useRouter();
    const { value: mobileNumber } = useSessionStorage('mobile', '')

    const {
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { otp: "" },
    });

    const otpValue = watch("otp");

    const onSubmit = async (data: FormData) => {

        if (!mobileNumber) {
            toast.error('شماره موبایل یافت نشد!');
            return
        }

        const res = await actionAuthOtp({ otp: data.otp, mobile: mobileNumber });
        console.log(res)
        if (res.success) {
            toast.success("ورود موفقیت آمیز بود");
            router.push("/");
        } else {
            toast.error(res.customMessage || "مشکلی پیش آمده، لطفاً دوباره تلاش کنید");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-background w-full relative pt-10 flex flex-col justify-between container-page"
        >
            <Button
                variant="secondary"
                className="rounded-full size-10 absolute top-4 left-4"
                type="button"
                onClick={() => router.back()}
            >
                <ArrowLeft className="size-5" />
            </Button>

            <div className="space-y-6">
                <Image
                    priority
                    unoptimized
                    alt="logo"
                    width={220}
                    height={200}
                    src="/common/logo.png"
                    className="mx-auto"
                />

                <div className="space-y-3">
                    <Label className="text-sm">
                        تأیید موبایل.
                        <span className={cn("font-iransans-light block mt-1", { "hidden": !mobileNumber })}>
                            کد ارسال شده به <span dir="ltr" className="inline-block">{mobileNumber}</span> را وارد کنید.
                        </span>
                    </Label>

                    <InputOTPOutlined
                        value={otpValue}
                        onChange={(value) => setValue("otp", value, { shouldValidate: true })}
                        error={errors.otp?.message}
                    />
                    <p className="flex items-center gap-2 w-full">
                        <span className="text-muted-foreground font-iransans-thin"> درخواست دوباره کد تا</span>
                        <CountdownTimer initialSeconds={30} />
                    </p>
                </div>
            </div>

            <div className="relative w-full py-5">
                <div className="absolute inset-x-0 top-0 h-px bg-accent/20 -mx-6" />
                <Button
                    variant="default"
                    size="default"
                    className="w-full text-lg font-iransans-light"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "در حال تأیید..." : "تأیید"}
                </Button>
            </div>
        </form>
    );
}


type InputOTPOutlinedProps = {
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

export const InputOTPOutlined = ({ value, onChange, error }: InputOTPOutlinedProps) => {
    const id = useId();

    return (
        <div className="space-y-2">
            <InputOTP
                id={id}
                maxLength={5}
                value={value}
                onChange={onChange}
                className={error ? "border-red-500" : ""}
            >
                <InputOTPGroup className="justify-evenly gap-2 *:data-[slot=input-otp-slot]:rounded-xl *:data-[slot=input-otp-slot]:border *:size-14 w-full">
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={0} />
                </InputOTPGroup>
            </InputOTP>
            {error && (
                <p className="text-xs text-destructive pt-1">{error}</p>
            )}
        </div>
    );
};
