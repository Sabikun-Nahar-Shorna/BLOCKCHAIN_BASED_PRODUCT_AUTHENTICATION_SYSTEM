import { MouseEventHandler } from "react";

interface ButtonProps {
  content: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export function Button(props: ButtonProps) {
  const { content, onClick, disabled = false } = props;
  return <button disabled={disabled} onClick={onClick} type="button" className="Button m-2 rounded-sm block text-white shadow-border disabled:bg-gray-400 bg-gray-900 hover:bg-black transition-colors duration-200 text-base py-2 px-5 uppercase font-semibold">
    {content}
  </button>
}