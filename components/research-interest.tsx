import { Image } from 'react-datocms';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
  title: string;
  description: string;
  iconUrl: string;
};

export const ResearchInterest = ({ title, description, iconUrl }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image data={{ src: iconUrl, width: 24, height: 24 }} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};
