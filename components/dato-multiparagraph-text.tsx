export const DatoMultiParagraphText = ({
	content,
	className,
	highlightLinks,
}: {
	content: string;
	className?: string;
	highlightLinks?: boolean;
}) => {
	return (
		<div
			className={`mpt ${className} ${highlightLinks ? "h-links" : ""}`}
			dangerouslySetInnerHTML={{ __html: content }}
		></div>
	);
};
