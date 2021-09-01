import { MouseEventHandler } from "react";

interface ButtonProps {
  content: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export function Button(props: ButtonProps) {
  const { content, onClick, disabled = false } = props;
  
  return <button disabled={disabled} onClick={onClick} type="button" className={`Button m-2 rounded-sm block text-white shadow-border disabled:bg-gray-400 bg-gray-900 transition-colors duration-200 text-base py-2 px-5 uppercase font-semibold ${disabled ? "" : "hover:bg-white hover:text-black border-gray-900 border-2"}`}>
    {content}
  </button>
}