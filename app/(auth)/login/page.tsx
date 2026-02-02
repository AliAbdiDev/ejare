'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { actionAuthLogin } from "@/app/auth";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/core/components/ui/form";
import { useSessionStorage } from "@/core/hooks/useSessionStorage";
import { LogoImage } from "@/core/components/custom/ui/Logo";

const schema = z.object({
    mobile: z
        .string()
        .length(11, { message: "شماره موبایل باید دقیقاً ۱۱ رقم باشد." })
        .regex(/^09[0-9]{9}$/, { message: "شماره موبایل باید با ۰۹ شروع شود." }),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
    const id = useId();
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { mobile: "" },
    });


    const { setValue } = useSessionStorage('mobile', '')

    const onSubmit = async (data: FormData) => {
        const res = await actionAuthLogin({ mobile: data.mobile });
        console.log(res)
        if (res.success) {
            toast.success("کد با موفقیت ارسال شد");
            setValue(data.mobile)
            router.push('/otp')
        } else {
            toast.error("مشکلی پیش آمده، لطفاً دوباره تلاش کنید");
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                  <LogoImage classNameImage=" mx-auto"/>

                    <div className="space-y-3">
                        <Label htmlFor={id} className="text-sm">
                            شماره موبایل .
                            <span className="font-iransans-light">
                                برای ورود یا ثبت نام شماره خود را وارد کنید.
                            </span>
                        </Label>

                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            id={id}
                                            placeholder="09xxxxxxxxx"
                                            type="tel"
                                            {...field}
                                            dir="ltr"
                                            className="text-left"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <p className="font-iransans-thin">
                            با ورود ،{" "}
                            <Link href="#" className="text-primary underline underline-offset-2">
                                قوانین و مقررات
                            </Link>{" "}
                            استفاده از واندرگیفت را می‌پذیرم.
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
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "در حال ارسال..." : "ارسال کد به شماره"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}