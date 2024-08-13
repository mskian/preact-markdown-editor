import { JSX } from 'preact';

interface ButtonProps {
  icon: JSX.Element;
  style: string;
  onClick: (style: string) => void;
}

export const Button = ({ icon, style, onClick }: ButtonProps) => {
  return (
    <button
      className="flex items-center justify-center p-2 text-xl text-text bg-editorBg hover:bg-buttonHover hover:text-white rounded-md focus:outline-none transition"
      onClick={() => onClick(style)}
    >
      {icon}
    </button>
  )
}
