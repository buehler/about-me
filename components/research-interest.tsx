import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
	title: string;
	description: string;
	icon: string;
};

export const ResearchInterest = ({ title, description, icon }: Props) => {
	return (
		<Card className="hover-subtle">
			<CardHeader>
				<CardTitle className="space-y-4">
					<div
						className="w-12 h-12 rounded-lg flex items-center justify-center"
						style={{ backgroundColor: "rgb(255 247 237)" }}
					>
						<div
							className="w-6 h-6"
							style={{ color: "rgb(194 65 12)" }}
							dangerouslySetInnerHTML={{ __html: icon }}
						/>
					</div>
					<h3 className="text-xl font-semibold text-balance">{title}</h3>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground leading-relaxed">{description}</p>
			</CardContent>
		</Card>
	);
};
