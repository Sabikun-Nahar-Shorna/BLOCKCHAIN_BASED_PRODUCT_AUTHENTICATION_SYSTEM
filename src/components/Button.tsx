interface ButtonProps {
  content: string
}

export function Button(props: ButtonProps) {
  const { content } = props;
  return <button type="button" className="Button m-3 rounded-sm block text-white shadow-border bg-gray-900 hover:bg-black transition-colors duration-200 text-base py-2 px-5 uppercase font-semibold">
    {content}
  </button>
}