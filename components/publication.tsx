import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

type Props = {
	data: {
		slug: string;
		title: string;
		venueTitle: string | null;
		publicationDate: string;
		authors: string;
		tags: string | null;
	};
};

export const Publication = ({ data }: Props) => (
	<Link className="block" href={`/pub/${data.slug}`}>
		<Card className="publication-card">
			<CardContent>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="text-xs text-gray-500">{data.publicationDate}</div>
						<div className="flex">
							<h3 className="text-lg font-semibold text-gray-900 flex-1">
								{data.title}
							</h3>
							<ExternalLink className="text-gray-500" />
						</div>
						{!!data.venueTitle && (
							<p className="text-sm text-gray-500 mb-3">{data.venueTitle}</p>
						)}
						<div className="space-x-2 my-2">
							{data.tags
								?.split(",")
								.map((t) => t.trim())
								.map((t, i) => (
									<Badge key={`${data.slug}-tag-${i}`} variant={"outline"}>
										{t}
									</Badge>
								))}
						</div>
						<p className="text-gray-600 mb-2">{data.authors}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</Link>
);
