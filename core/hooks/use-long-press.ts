import { MouseEvent, PointerEvent, useCallback, useEffect, useRef } from "react";

type UseLongPressOptions = {
  onLongPress: () => void;
  durationMs?: number;
  moveCancelThreshold?: number;
};

type UseLongPressResult<TElement extends HTMLElement> = {
  onPointerDown: (event: PointerEvent<TElement>) => void;
  onPointerMove: (event: PointerEvent<TElement>) => void;
  onPointerUp: () => void;
  onPointerCancel: () => void;
  onPointerLeave: () => void;
  shouldSuppressClick: (event?: MouseEvent<TElement>) => boolean;
  reset: () => void;
};

export function useLongPress<TElement extends HTMLElement>({
  onLongPress,
  durationMs = 300,
  moveCancelThreshold = 12,
}: UseLongPressOptions): UseLongPressResult<TElement> {
  const timeoutRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const endGesture = useCallback(() => {
    clearTimer();
    pointerStartRef.current = null;
  }, [clearTimer]);

  const reset = useCallback(() => {
    endGesture();
    suppressClickRef.current = false;
  }, [endGesture]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const onPointerDown = useCallback(
    (event: PointerEvent<TElement>) => {
      if (event.pointerType !== "touch") return;

      suppressClickRef.current = false;
      pointerStartRef.current = { x: event.clientX, y: event.clientY };
      clearTimer();

      timeoutRef.current = window.setTimeout(() => {
        suppressClickRef.current = true;
        onLongPress();
      }, durationMs);
    },
    [clearTimer, durationMs, onLongPress]
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<TElement>) => {
      if (!pointerStartRef.current) return;

      const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
      const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);

      if (deltaX > moveCancelThreshold || deltaY > moveCancelThreshold) {
        endGesture();
      }
    },
    [endGesture, moveCancelThreshold]
  );

  const shouldSuppressClick = useCallback((event?: MouseEvent<TElement>) => {
    if (!suppressClickRef.current) return false;

    if (event) {
      event.preventDefault();
    }

    suppressClickRef.current = false;
    return true;
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endGesture,
    onPointerCancel: endGesture,
    onPointerLeave: endGesture,
    shouldSuppressClick,
    reset,
  };
}
