interface TextInputProps {
  label: string
  placeHolder: string
}

export function TextInput(props: TextInputProps) {
  const { label, placeHolder } = props;
  return <div className="flex m-2">
    <span className="border-2 inline-block whitespace-no-wrap flex-1 rounded-sm px-4 py-2 text-white text-base font-semibold bg-gray-900 whitespace-no-wrap">{label}</span>
    <input className="border-2 rounded-r px-4 py-2 w-full" type="text" placeholder={placeHolder} />
  </div>
}