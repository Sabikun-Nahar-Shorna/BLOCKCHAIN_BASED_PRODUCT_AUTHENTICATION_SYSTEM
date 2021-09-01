import { MouseEventHandler } from "react";

interface ButtonProps {
  content: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  variant?: "primary" | "secondary"
}

export function Button(props: ButtonProps) {
  const { content, onClick, disabled = false, variant = "primary" } = props;
  const primaryVariantClasses = `text-white bg-gray-900 ${disabled ? "" : "hover:bg-white hover:text-black border-gray-900"}`, secondaryVariantClasses = `text-black bg-white ${disabled ? "" : "hover:bg-gray-900 hover:border-white hover:text-white"}`;
  const variantClasses = variant === "primary" ? primaryVariantClasses : secondaryVariantClasses;

  return <button disabled={disabled} onClick={onClick} type="button" className={`Button ${variantClasses} m-2 rounded-sm block shadow-border disabled:bg-gray-400  transition-colors duration-200 text-base py-2 px-5 uppercase font-semibold ${disabled ? "" : "border-2"}`}>
    {content}
  </button>
}