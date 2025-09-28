import { DatoMultiParagraphText } from '@/components/dato-multiparagraph-text';
import { Publication } from '@/components/publication';
import { ResearchInterest } from '@/components/research-interest';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { SRCImage } from 'react-datocms';

const query = graphql(`
  {
    aboutMe {
      email
      title
      workTitle
      workplace
      location
      about
      profilePicture {
        responsiveImage(imgixParams: { w: "200", h: "200", fit: crop, auto: format }) {
          src
          srcSet
          width
          height
          alt
          title
          base64
          bgColor
          sizes
        }
      }
    }
    allSocialLinks {
      id
      link
      icon {
        url(imgixParams: { w: "32", h: "32" })
      }
    }
    allInterests(orderBy: [order_ASC]) {
      id
      title
      description
      icon {
        url
      }
    }
    allPublications(orderBy: [publicationDate_DESC]) {
      id
      slug
      title
      venueTitle
      publicationDate
      authors
      tags
    }
  }
`);

export default async function AboutMe() {
  const { aboutMe, allSocialLinks, allInterests, allPublications } = await executeQuery(query);

  if (!aboutMe) {
    return <main>404</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <SRCImage
                imgClassName="rounded-full border-4 border-gray-200"
                data={aboutMe.profilePicture!.responsiveImage!}
                imgStyle={{
                  width: `${aboutMe.profilePicture!.responsiveImage!.width}px`,
                  height: `${aboutMe.profilePicture!.responsiveImage!.height}px`,
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">Christoph Bühler</h1>
              <p className=" text-gray-400 mb-4">{aboutMe.title}</p>
              <DatoMultiParagraphText className="text-xl text-gray-600 mb-4" content={aboutMe.workTitle} />
              <DatoMultiParagraphText className="text-lg text-gray-500 mb-6" content={aboutMe.workplace} />
              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>
                    <Link href={`mailto:${aboutMe.email}`}>{aboutMe.email}</Link>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{aboutMe.location}</span>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center md:justify-start justify-center text-gray-500">
                {!!allSocialLinks.length &&
                  allSocialLinks.map((l) => (
                    <Link key={l.id} href={l.link} target="_blank">
                      <div className="w-8 h-8">
                        <img
                          src={l.icon.url}
                          width={32}
                          height={32}
                          className="invert-[44%] sepia-[3%] saturate-[2622%] hue-rotate-[182deg] brightness-[94%] contrast-[69%]"
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          <DatoMultiParagraphText className="space-y-2 max-w-none text-gray-700" content={aboutMe.about} />
        </section>
        {!!allInterests.length && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Research Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allInterests.map((i) => (
                <ResearchInterest key={i.id} title={i.title} description={i.description} iconUrl={i.icon.url} />
              ))}
            </div>
          </section>
        )}
        {!!allPublications.length && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Publications</h2>
            <div className="space-y-6">
              {allPublications.map((i) => (
                <Publication key={i.id} data={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
