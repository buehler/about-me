import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { getServerSideURL } from '@/lib/utils';
import type { MetadataRoute } from 'next';

const query = graphql(`
  {
    aboutMe {
      _publishedAt
    }
    allPublications {
      slug
      _publishedAt
    }
  }
`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { aboutMe, allPublications } = await executeQuery(query);
  return [
    {
      url: getServerSideURL(),
      priority: 1,
      changeFrequency: 'monthly',
      lastModified: aboutMe?._publishedAt ?? new Date(),
    },
    ...allPublications.map(
      (pub) =>
        ({
          url: `${getServerSideURL()}/pub/${pub.slug}`,
          lastModified: pub._publishedAt,
          changeFrequency: 'yearly',
          priority: 0.9,
        } satisfies MetadataRoute.Sitemap[number])
    ),
  ];
}
