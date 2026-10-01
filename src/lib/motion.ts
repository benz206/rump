import { timing } from "@/config/content";
export const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 }, transition: { duration: timing.fade, ease: "easeOut" as const } };
export const stagger = (delay = timing.stagger) => ({ staggerChildren: delay });
export const drawer = { type: "spring" as const, stiffness: 300, damping: 30 };
export const zoom = { duration: timing.zoom, ease: "easeInOut" as const };
