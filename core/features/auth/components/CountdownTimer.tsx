// components/CountdownTimer.tsx
'use client';

import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/utils/utils";

type CountdownTimerProps = {
    initialSeconds?: number;
    onComplete?: () => void;
    className?: string;
};

const CountdownTimer = ({
    initialSeconds = 2,
    onComplete,
    className,
}: CountdownTimerProps) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(true);

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // تایمر اصلی
    useEffect(() => {
        if (!isActive || seconds <= 0) return;

        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    setIsActive(false);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, seconds, initialSeconds, onComplete]);

    // ریست دستی
    const reset = useCallback(() => {
        setSeconds(initialSeconds);
        setIsActive(true);
    }, [initialSeconds]);

    return (
           <>
            {isActive ? (
                 formatTime(seconds)
            ) : (
                <Button size="sm" variant="link" onClick={reset} className="p-0">
                    ارسال مجدد
                </Button>
            )}
           </>
    );
};

CountdownTimer.displayName = "displayName";
export default memo(CountdownTimer)