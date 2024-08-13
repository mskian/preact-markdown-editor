import { useState, useEffect } from 'preact/hooks';
import { FaMoon, FaSun, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaMarkdown } from "react-icons/fa6";
import { Preview } from './components/Preview';
import { Editor } from './components/Editor';

export const App = () => {
  const getInitialState = (key: string, defaultValue: boolean): boolean => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? defaultValue : storedValue === 'true';
  };

  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(() => getInitialState('isPreview', false));
  const [darkMode, setDarkMode] = useState(() => getInitialState('darkMode', false));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('isPreview', isPreview.toString());
  }, [isPreview]);

  const toggleDarkMode = () => setDarkMode(prevMode => !prevMode);

  const togglePreviewMode = () => setIsPreview(prevMode => !prevMode);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-darkBackground' : 'bg-background'}`}>
      <div className={`flex flex-col md:flex-row justify-between items-center p-4 border-b ${darkMode ? 'bg-primary-dark' : 'bg-primary'} text-white`}>
        <h1 className="text-5xl font-bold"><FaMarkdown /></h1>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <div className="flex flex-col items-center space-y-1">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isPreview}
                onChange={togglePreviewMode}
              />
              <div className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors ${isPreview ? 'bg-green-600' : 'bg-gray-500'}`}>
                <span
                  className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform ${isPreview ? 'transform translate-x-6' : ''}`}
                />
              </div>
            </label>
            <div className="flex flex-col items-center space-y-1 text-xs">
              {isPreview ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <div className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-green-600' : 'bg-gray-500'}`}>
                <span
                  className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full transition-transform ${darkMode ? 'transform translate-x-6' : ''}`}
                />
              </div>
            </label>
            <div className="flex flex-col items-center space-y-1 text-xs">
              {darkMode ? (
                <FaMoon />
              ) : (
                <FaSun />
              )}
              <span>{darkMode ? 'Light' : 'Dark'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow p-4">
        {isPreview ? (
          <Preview content={content} darkMode={darkMode} />
        ) : (
          <Editor onChange={setContent} />
        )}
      </div>
    </div>
  );
};
