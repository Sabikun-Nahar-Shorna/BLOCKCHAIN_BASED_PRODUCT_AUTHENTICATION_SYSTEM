import { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes } from "react";

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  label: string
  placeHolder: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

export function TextInput(props: TextInputProps) {
  const { onChange, value, label, placeHolder, disabled = false, ...extra } = props;
  return <div className="flex m-2">
    <div className={`border-2 sm:text-base whitespace-no-wrap rounded-sm sm:px-4 sm:py-2 py-1 px-2 text-white text-sm flex items-center font-semibold ${disabled ? "bg-gray-400" : "bg-gray-900"} whitespace-no-wrap mr-2`}>{label}</div>
    <input onChange={onChange} {...extra} disabled={disabled} value={value} className={`border-2 border-gray-400 flex-1 rounded-r sm:p-3 p-2 ${disabled ? "text-gray-500" : ""}`} placeholder={placeHolder} /> 
  </div>
}