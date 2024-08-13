import { useState, useEffect } from 'preact/hooks';
import { marked } from 'marked';
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
    const convertMarkdown = async () => {
      if (!content) {
        setHtmlContent('');
        return;
      }

      try {
        if (typeof content !== 'string' || content.trim() === '') {
          throw new Error('Invalid content');
        }

        const markdown = await marked(content);
        setHtmlContent(markdown);
        setError(null);
      } catch (err) {
        console.error('Error rendering preview:', err);
        setError('Error rendering preview');
        setHtmlContent('');
      }
    };

    convertMarkdown();
  }, [content]);

  const commonClasses = "box p-6 border rounded-md overflow-auto break-words";
  const modeClasses = darkMode ? "dark-mode" : "light-mode";

  const errorClasses = "notification is-danger";

  return (
    <div className={`${commonClasses} ${modeClasses}`}>
      {error ? (
        <div className={errorClasses}>{error}</div>
      ) : !content ? (
        <div className="p-4 has-text-grey">Nothing to preview...</div>
      ) : (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}
