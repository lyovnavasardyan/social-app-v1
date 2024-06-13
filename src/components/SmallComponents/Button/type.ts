
export type ButtonType = {
    className?: string,
    width?: string,
    height?: string,
    color?: string,
    bgColor?: string,
    size?: "small" | "medium" | "large",
    text?: string | number,
    usage?: "button" | "menu" | "pagination"
    onClick?: () => void
}