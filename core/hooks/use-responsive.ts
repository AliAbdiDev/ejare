import { useEffect, useMemo, useState } from "react";

export type TResponsiveBreakpoints = {
  xss: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
  "6xl": number;
  "7xl": number;
  mobile: number;
  tablet: number;
  laptop: number;
};

const DEFAULT_BREAKPOINTS: TResponsiveBreakpoints = {
  xss: 320,
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1600,
  "4xl": 1920,
  "5xl": 2560,
  "6xl": 3200,
  "7xl": 3840,
  mobile: 375,
  tablet: 768,
  laptop: 1024,
};

type TResponsiveReturn = {
  width: number;
  xss: boolean;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  "2xl": boolean;
  "3xl": boolean;
  "4xl": boolean;
  "5xl": boolean;
  "6xl": boolean;
  "7xl": boolean;
  mobile: boolean;
  tablet: boolean;
  laptop: boolean;
  breakpoints: TResponsiveBreakpoints;
};

const getInitialWidth = (fallback: number): number => {
  if (typeof window === "undefined") return fallback;
  return window.innerWidth;
};

export function useResponsive(
  customBreakpoints?: Partial<TResponsiveBreakpoints>
): TResponsiveReturn {
  const breakpoints = useMemo<TResponsiveBreakpoints>(
    () => ({
      ...DEFAULT_BREAKPOINTS,
      ...customBreakpoints,
    }),
    [customBreakpoints]
  );

  const [width, setWidth] = useState<number>(() => getInitialWidth(breakpoints.xss));

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId = 0;
    const onResize = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        setWidth(window.innerWidth);
      });
    };

    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const responsiveValues = useMemo(() => {
    const isXss = width >= breakpoints.xss;
    const isXs = width >= breakpoints.xs;
    const isSm = width >= breakpoints.sm;
    const isMd = width >= breakpoints.md;
    const isLg = width >= breakpoints.lg;
    const isXl = width >= breakpoints.xl;
    const is2xl = width >= breakpoints["2xl"];
    const is3xl = width >= breakpoints["3xl"];
    const is4xl = width >= breakpoints["4xl"];
    const is5xl = width >= breakpoints["5xl"];
    const is6xl = width >= breakpoints["6xl"];
    const is7xl = width >= breakpoints["7xl"];

    const isMobile = width >= breakpoints.mobile && width < breakpoints.tablet;
    const isTablet = width >= breakpoints.tablet && width < breakpoints.laptop;
    const isLaptop = width >= breakpoints.laptop;

    return {
      xss: isXss,
      xs: isXs,
      sm: isSm,
      md: isMd,
      lg: isLg,
      xl: isXl,
      "2xl": is2xl,
      "3xl": is3xl,
      "4xl": is4xl,
      "5xl": is5xl,
      "6xl": is6xl,
      "7xl": is7xl,
      mobile: isMobile,
      tablet: isTablet,
      laptop: isLaptop,
    };
  }, [breakpoints, width]);

  return {
    width,
    ...responsiveValues,
    breakpoints,
  };
}
