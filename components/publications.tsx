import { ExternalLink } from 'lucide-react';
import PublicationList from '../data/publications.json';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function Publications() {
  return (
    <div className="space-y-6">
      {PublicationList.map((publication, i) => (
        <Publication key={i} data={publication} />
      ))}
    </div>
  );
}

const Publication = ({ data }: { data: (typeof PublicationList)[number] }) => (
  <Card>
    <CardContent>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex">
            <h3 className="text-lg font-semibold text-gray-900 flex-1">{data.title}</h3>
            {data.url && (
              <a href={data.url} target="_blank">
                <ExternalLink className="text-gray-400 hover:text-amber-400 transition-colors" />
              </a>
            )}
          </div>
          <div className="space-x-2 mb-4">
            {data.tags.map((t, i) => (
              <Badge key={`${data.title}-tag-${i}`} variant={'outline'}>
                {t}
              </Badge>
            ))}
          </div>
          <p className="text-gray-600 mb-2">
            {data.authors.map((a, i) => (
              <span key={i}>
                <span className={`${a.name === 'Christoph Bühler' ? 'font-semibold' : ''}`}>
                  {a.name}
                  {a.role && ` (${a.role})`}
                </span>
                {i < data.authors.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p className="text-sm text-gray-500 mb-3">Nature Machine Intelligence, 2024</p>
          <Collapsible>
            <CollapsibleTrigger>
              <h4 className="text-gray-600 cursor-pointer">Abstract</h4>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p>{data.abstract}</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </CardContent>
  </Card>
);
