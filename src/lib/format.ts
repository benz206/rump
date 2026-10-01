export const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
export const pct = (value: number) => new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 1 }).format(value);
export const compact = (value: number) => new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
export const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
