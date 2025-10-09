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
      shortIntroduction
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
    allSocialLinks(orderBy: [_createdAt_ASC]) {
      link
      icon
    }
    allInterests(orderBy: [order_ASC]) {
      id
      title
      description
      icon
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
    <div className="min-h-screen bg-background pb-12">
      <nav className="sticky top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl gradient-text">Christoph Bühler</div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#research" className="text-muted-foreground hover:text-primary transition-colors">
                Research
              </Link>
              <Link href="#publications" className="text-muted-foreground hover:text-primary transition-colors">
                Publications
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <header className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <div className="text-center md:text-left grow">
              <h1 className="text-5xl font-bold text-foreground text-balance">Christoph Bühler</h1>
              <p className=" text-gray-400 mb-4">{aboutMe.title}</p>
              <DatoMultiParagraphText className="text-xl text-orange-800 mb-4" content={aboutMe.workTitle} />
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
              <section id="social-links" className="flex flex-row gap-4 items-center md:justify-start justify-center">
                {allSocialLinks.map(({ link, icon }, index) => (
                  <Link
                    className="text-gray-400 hover:text-orange-400 hover:scale-110 transition-colors transition-transform"
                    key={`social-link-${index}`}
                    href={link}
                    target="_blank"
                  >
                    <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: icon }} />
                  </Link>
                ))}
              </section>
            </div>
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
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">{aboutMe.shortIntroduction}</p>
        </div>
      </header>
      <main>
        <section id="about" className="pt-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 pb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">About Me</h2>
            <DatoMultiParagraphText
              className="space-y-6 prose prose-lg max-w-none text-muted-foreground leading-relaxed"
              highlightLinks
              content={aboutMe.about}
            />
          </div>
        </section>
        <section id="research" className="pt-20">
          <div className="max-w-4xl mx-auto px-6 pb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Research Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allInterests.map((i) => (
                <ResearchInterest key={i.id} title={i.title} description={i.description} icon={i.icon} />
              ))}
            </div>
          </div>
        </section>
        <section id="publications" className="pt-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 pb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Publications</h2>
            <div className="space-y-6">
              {allPublications.map((i) => (
                <Publication key={i.id} data={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
