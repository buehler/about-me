import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

const query = graphql(`
  query GetPublicationDetail($slug: String = "") {
    publication(filter: { slug: { in: [$slug] } }) {
      title
      venueTitle
      publicationDate
      authors
      abstract
      file {
        url
      }
    }
  }
`);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { publication } = await executeQuery(query, {
    variables: {
      slug,
    },
  });

  return {
    title: publication?.title,
    description: publication?.abstract,
  };
}

export default async function PublicationDetail({ params }: { params: Promise<{ slug: string }> }) {
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
            <h1 className="text-4xl font-bold text-gray-900">Publication not found</h1>
          </CardContent>
        </Card>
      </main>
    );
  }

  const authors = publication.authors.split(',').map((a) => a.trim());

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="max-w-4xl mx-auto px-6 mb-4 mt-8">
          <Link href="/" className="flex text-gray-700">
            <ArrowLeft />
            Back
          </Link>
        </nav>
        <div className="max-w-4xl mx-auto px-6 pb-12 pt-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="text-center md:text-left">
              <div className="text-gray-500">{publication.publicationDate}</div>
              <h1 className="text-2xl md:text-4xl text-left mb-4 font-bold text-gray-900">{publication.title}</h1>
              {!!publication.venueTitle && <p className="text-left text-gray-500 mb-4">{publication.venueTitle}</p>}
            </div>
          </div>
          <div>
            {authors.map((a, i) => (
              <span key={i}>
                {a}
                {i < authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      </header>
      <section className="py-4 grow flex">
        <Tabs defaultValue="abstract" className="grow">
          <TabsList className="mx-auto mb-6">
            <TabsTrigger value="abstract">Abstract</TabsTrigger>
            <TabsTrigger value="paper">Full Work</TabsTrigger>
          </TabsList>

          <TabsContent value="abstract" className="max-w-4xl mx-auto">
            <p className="text-gray-900 text-justify px-4">{publication.abstract}</p>
          </TabsContent>
          <TabsContent value="paper" className="w-full mx-4 md:w-6xl md:mx-auto">
            <object data={publication.file.url} type="application/pdf" className="w-full h-full">
              <div className="text-center mx-auto">
                <p>Sorry, your browser does not support rendering a PDF file. But not to worry...</p>
                <Link
                  href={publication.file.url}
                  target="_blank"
                  className="bg-amber-300 px-12 py-8 inline-block rounded-2xl mt-8 text-2xl"
                >
                  Download PDF
                </Link>
              </div>
            </object>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
