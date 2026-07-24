import { CopyToClipboardButton } from "@/components/copy-to-clipboard";
import { DatoMultiParagraphText } from "@/components/dato-multiparagraph-text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";
import {
	Calendar,
	FileText,
	Link as LinkIcon,
	MapPin,
	Users,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const query = graphql(`
  query GetPublicationDetail($slug: String = "") {
    publication(filter: { slug: { in: [$slug] } }) {
      title
      venueTitle
      publicationDate
      authors
      abstract
      tags
      url
      file {
        url
      }
      actionbuttons
      citation
    }
  }
`);

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const { publication } = await executeQuery(query, {
		variables: {
			slug,
		},
	});

	return {
		title: `${publication?.title} - Christoph Bühler`,
		description: publication?.abstract,
	};
}

export default async function PublicationDetail({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { publication } = await executeQuery(query, {
		variables: {
			slug,
		},
	});

	if (!publication) {
		return (
			<main className="min-h-screen min-w-screen bg-gray-50 flex items-center justify-center">
				<Card>
					<CardContent>
						<h1 className="text-4xl font-bold text-gray-900">
							Publication not found
						</h1>
					</CardContent>
				</Card>
			</main>
		);
	}

	const authors = publication.authors.split(",").map((a) => a.trim());
	const tags = publication.tags?.split(",").map((t) => t.trim()) ?? [];
	const actionButtons = publication.actionbuttons as {
		link: string;
		text: string;
	}[];

	return (
		<>
			<header>
				<div className="space-x-4 mb-6">
					{tags.map((t, i) => (
						<span
							key={`tag-${i}`}
							className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
							style={{
								backgroundColor: "rgb(255 247 237)",
								color: "rgb(194 65 12)",
							}}
						>
							{t}
						</span>
					))}
				</div>
				<h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
					{publication.title}
				</h1>
				<div className="gap-6 text-muted-foreground mb-8">
					<div className="flex items-center gap-2">
						<Calendar className="w-4 h-4" style={{ color: "rgb(194 65 12)" }} />
						<span>{publication.publicationDate}</span>
					</div>
					<div className="flex items-center">
						<Users
							className="w-4 h-4 mr-2"
							style={{ color: "rgb(194 65 12)" }}
						/>
						<div className="space-x-3">
							{authors.map((a, i) => (
								<span key={`author-${i}`}>{a}</span>
							))}
						</div>
					</div>
					{!!publication.venueTitle && (
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4" style={{ color: "rgb(194 65 12)" }} />
							{publication.venueTitle}
						</div>
					)}
				</div>
			</header>
			<main>
				<div className="mb-12 flex flex-wrap gap-4">
					<Link
						href={publication.file.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 hover:scale-110 transition-opacity transition-transform"
						style={{ backgroundColor: "rgb(194 65 12)" }}
					>
						<FileText className="w-4 h-4" />
						Full Paper
					</Link>
					{publication.url && (
						<Link
							href={publication.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted/50 hover:scale-110 transition-colors transition-transform"
						>
							<LinkIcon className="w-4 h-4" />
							Publication
						</Link>
					)}
					{actionButtons?.map((btn, i) => (
						<Link
							key={`action-button-${i}`}
							href={btn.link}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg font-medium hover:bg-muted/50 hover:scale-110 transition-colors transition-transform"
						>
							{btn.text}
						</Link>
					))}
				</div>
				<section>
					<Card className="bg-card rounded-lg p-8 border border-border mb-12">
						<CardHeader>
							<h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
								<div
									className="w-8 h-8 rounded-lg flex items-center justify-center"
									style={{ backgroundColor: "rgb(255 247 237)" }}
								>
									<FileText
										className="w-4 h-4"
										style={{ color: "rgb(194 65 12)" }}
									/>
								</div>
								Abstract
							</h2>
						</CardHeader>
						<CardContent>
							<DatoMultiParagraphText
								className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4 text-balance"
								content={publication.abstract}
							/>
						</CardContent>
					</Card>
				</section>
				{!!publication.citation && (
					<section>
						<div className="bg-muted/30 rounded-lg p-8 border border-border">
							<h2 className="text-xl font-bold mb-4">Citation</h2>
							<div className="bg-card rounded-lg p-4 border border-border font-mono text-sm relative">
								<div className="overflow-x-auto">
									<pre>{publication.citation}</pre>
								</div>
								<CopyToClipboardButton
									textToCopy={publication.citation}
									className="absolute right-0 top-0 p-2 border-l border-b rounded-bl-lg transition-colors"
									onCopiedTrueClassName="bg-green-500 text-white border-green-600"
									onCopiedFalseClassName="bg-neutral-50 text-black border-neutral-200"
								/>
							</div>
						</div>
					</section>
				)}
			</main>
		</>
	);
}
