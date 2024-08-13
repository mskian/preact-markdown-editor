import { Button } from './Button';
import { AiOutlineBold, AiOutlineItalic, AiOutlineLink, AiOutlineNumber } from 'react-icons/ai';
import { BiHeading } from 'react-icons/bi';
import { FiImage, FiTwitch, FiList } from 'react-icons/fi';
import { RiStrikethrough } from 'react-icons/ri';
import { FaRegCopy, FaRegTrashAlt } from 'react-icons/fa';
import { MdHorizontalRule } from "react-icons/md";

interface ToolbarProps {
  onFormat: (style: string) => void;
  onClear: () => void;
  onCopy: () => void;
  onSymbolClick: (symbol: string) => void;
  symbolType: string;
  setSymbolType: (symbolType: string) => void;
}

export const Toolbar = ({ onFormat, onClear, onCopy, onSymbolClick, symbolType, setSymbolType }: ToolbarProps) => {
  return (
    <div className="flex flex-wrap justify-start items-center p-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600 rounded-t-md gap-2">
      <Button icon={<span className="text-xl"><AiOutlineBold /></span>} style="bold" onClick={onFormat} />
      <Button icon={<span className="text-xl"><AiOutlineItalic /></span>} style="italic" onClick={onFormat} />
      <Button icon={<span className="text-xl"><BiHeading /></span>} style="heading" onClick={onFormat} />
      <Button icon={<span className="text-xl"><AiOutlineLink /></span>} style="link" onClick={onFormat} />
      <Button icon={<span className="text-xl"><FiImage /></span>} style="image" onClick={onFormat} />
      <Button icon={<span className="text-xl"><FiTwitch /></span>} style="quote" onClick={onFormat} />
      <Button icon={<span className="text-xl"><AiOutlineNumber /></span>} style="numberedList" onClick={onFormat} />
      <Button icon={<span className="text-xl"><FiList /></span>} style="bulletList" onClick={onFormat} />
      <Button icon={<span className="text-xl"><RiStrikethrough /></span>} style="strikethrough" onClick={onFormat} />
      <button
          type="button"
          onClick={() => onSymbolClick('***')}
          class="flex items-center justify-center p-2 text-xl text-text bg-editorBg hover:bg-buttonHover hover:text-white rounded-md focus:outline-none transition"
          title="Add hr Line"
        >
        <MdHorizontalRule />
      </button>
      <Button icon={<span className="text-xl"><FaRegCopy /></span>} style="copy" onClick={onCopy} />
      <Button icon={<span className="text-xl"><FaRegTrashAlt /></span>} style="clear" onClick={onClear} />
    </div>
  );
};
