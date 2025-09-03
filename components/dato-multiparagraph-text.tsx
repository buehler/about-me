export const DatoMultiParagraphText = ({ content, className }: { content: string; className?: string }) => {
  return <div className={`mpt ${className}`} dangerouslySetInnerHTML={{ __html: content }}></div>;
};
