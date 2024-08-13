import { useState, useEffect } from 'preact/hooks';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './css/bulma.css';
import './css/preview.css';

interface PreviewProps {
  content: string;
  darkMode: boolean;
}

export const Preview = ({ content, darkMode }: PreviewProps) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedContent = localStorage.getItem('markdownContent') || '';
    
    const convertMarkdown = async (markdownContent: string) => {
      if (!markdownContent) {
        setHtmlContent('');
        return;
      }

      try {
        if (typeof markdownContent !== 'string' || markdownContent.trim() === '') {
          throw new Error('Invalid content');
        }

        const markdown = await marked(markdownContent);
        const sanitizedHtml = DOMPurify.sanitize(markdown);
        setHtmlContent(sanitizedHtml);
        setError(null);
      } catch (err) {
        console.error('Error rendering preview:', err);
        setError('Error rendering preview');
        setHtmlContent('');
      }
    };

    convertMarkdown(content || storedContent);
  }, [content]);

  const commonClasses = "box p-6 border rounded-md overflow-auto break-words";
  const modeClasses = darkMode ? "dark-mode" : "light-mode";
  const errorClasses = "notification is-danger";

  return (
    <div className={`${commonClasses} ${modeClasses}`}>
      {error ? (
        <div className={errorClasses}>{error}</div>
      ) : !htmlContent ? (
        <div className="p-4 has-text-grey">Nothing to preview...</div>
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
};
