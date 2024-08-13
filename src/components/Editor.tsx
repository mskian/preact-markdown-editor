import { useState, useRef, useEffect } from 'preact/hooks';
import { Toolbar } from './Toolbar';
import { applyMarkdownStyle } from '../utils/markdown';

export const Editor = ({ onChange }) => {
  const [content, setContent] = useState(() => localStorage.getItem('markdownContent') || '');
  const [listCounter, setListCounter] = useState(1);
  const [alert, setAlert] = useState(null);
  const [symbolType, setSymbolType] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('markdownContent', content);
  }, [content]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = content;
    }
  }, [content]);

  const handleChange = (event) => {
    const value = event.target.value;
    setContent(value);
    onChange(value);
  };

  const handleFormat = (style) => {
    if (textareaRef.current) {
      let formattedText = '';
      const start = textareaRef.current.selectionStart ?? 0;
      const end = textareaRef.current.selectionEnd ?? 0;

      switch (style) {
        case 'numberedList':
          formattedText = applyListStyle(content, start, end, true);
          break;
        case 'bulletList':
          formattedText = applyListStyle(content, start, end, false);
          break;
        case 'bold':
        case 'italic':
        case 'heading':
        case 'link':
        case 'image':
        case 'code':
        case 'quote':
        case 'strikethrough':
          formattedText = applyMarkdownStyle(content, style, start, end);
          break;
        default:
          formattedText = content;
      }

      setContent(formattedText);
      onChange(formattedText);
    }
  };

  const handleClear = () => {
    const confirmClear = window.confirm('Are you sure you want to clear the content?');
    if (confirmClear) {
      setContent('');
      onChange('');
      showAlert('Content cleared successfully');
    }
  };

  const handleCopy = async () => {
    if (content.trim() === '') {
      showAlert('There is no content to copy.');
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      showAlert('Content copied to clipboard');
    } catch (error) {
      console.error('Failed to copy content:', error);
      showAlert('Failed to copy content. Please try again.');
    }
  };

  const handleSymbolClick = (symbol) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart ?? 0;
      const end = textareaRef.current.selectionEnd ?? 0;
      const before = content.slice(0, start);
      const after = content.slice(end);
      const newContent = `${before}${symbol}${after}`;
      setContent(newContent);
      onChange(newContent);
    }
  };

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const applyListStyle = (text, start, end, isNumbered) => {
    const lines = text.split('\n');
    const startLineIndex = text.substring(0, start).split('\n').length - 1;
    const endLineIndex = text.substring(0, end).split('\n').length - 1;

    const listPrefix = isNumbered ? (index) => `${listCounter + index}. ` : () => '- ';
    const updatedLines = lines.map((line, index) => {
      if (index >= startLineIndex && index <= endLineIndex) {
        return `${listPrefix(index - startLineIndex)}${line}`;
      }
      return line;
    });

    setListCounter(listCounter + (endLineIndex - startLineIndex + 1));
    return updatedLines.join('\n');
  };

  return (
    <div className="relative flex flex-col min-h-screen p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
      <Toolbar
        onFormat={handleFormat}
        onClear={handleClear}
        onCopy={handleCopy}
        onSymbolClick={handleSymbolClick}
        symbolType={symbolType}
        setSymbolType={setSymbolType}
      />
      <textarea
        ref={textareaRef}
        className="flex-grow p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-t border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-500 dark:placeholder-gray-400 resize-none text-base"
        value={content}
        onInput={handleChange}
        placeholder="Write your content here"
        rows={10}
        spellCheck={false}
      />
      {alert && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-blue-500 text-white rounded-md shadow-lg flex items-center justify-between space-x-4">
          <span>{alert}</span>
          <button
            onClick={() => setAlert(null)}
            className="text-white focus:outline-none hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
