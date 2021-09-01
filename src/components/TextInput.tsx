import { ChangeEventHandler } from "react";

interface TextInputProps {
  label: string
  placeHolder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

export function TextInput(props: TextInputProps) {
  const { onChange, value, label, placeHolder, disabled = false } = props;
  return <div className="flex m-2">
    <div className={`border-2 inline-block whitespace-no-wrap rounded-md px-4 py-2 text-white text-base font-semibold ${disabled ? "bg-gray-400" : "bg-gray-900"} whitespace-no-wrap mr-2`}>{label}</div>
    <input onChange={onChange} disabled={disabled} value={value} className={`border-2 border-gray-300 flex-1 rounded-r px-2 py-2 ${disabled ? "text-gray-500" : ""}`} type="text" placeholder={placeHolder} /> 
  </div>
}