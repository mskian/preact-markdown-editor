export const applyMarkdownStyle = (text: string, style: string, start: number, end: number) => {
  let markdown = text;
  switch (style) {
    case 'bold':
      markdown = wrapSelection(text, '**', '**', start, end);
      break;
    case 'italic':
      markdown = wrapSelection(text, '_', '_', start, end);
      break;
    case 'heading':
      markdown = insertAtStart(text, '# ', start);
      break;
    case 'link':
      markdown = wrapSelection(text, '[', '](url)', start, end);
      break;
    case 'image':
      markdown = wrapSelection(text, '![', '](image-url)', start, end);
      break;
    case 'code':
      markdown = wrapSelection(text, '`', '`', start, end);
      break;
    case 'pre':
      markdown = wrapSelection(text, '```', '```', start, end);
      break;
    case 'quote':
      markdown = insertAtStart(text, '> ', start);
      break;
    case 'list':
      markdown = insertAtStart(text, '- ', start);
      break;
    case 'numberedList':
      markdown = insertAtStart(text, '1. ', start);
      break;
    case 'strikethrough':
      markdown = wrapSelection(text, '~~', '~~', start, end);
      break;
    default:
      break;
  }
  return markdown;
}

const wrapSelection = (text: string, before: string, after: string, start: number, end: number) => {
  return text.slice(0, start) + before + text.slice(start, end) + after + text.slice(end);
}

const insertAtStart = (text: string, insertion: string, start: number) => {
  return text.slice(0, start) + insertion + text.slice(start);
}
