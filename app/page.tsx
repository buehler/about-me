import { ExternalLink } from '@/components/ext-link';
import { Publication } from '@/components/publication';
import { ResearchInterest } from '@/components/research-interest';
import { SocialLink } from '@/components/social-link';
import { executeQuery } from '@/lib/datocms/executeQuery';
import { graphql } from '@/lib/datocms/graphql';
import { Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const query = graphql(`
  {
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
  const { allInterests, allPublications } = await executeQuery(query);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <Image
                src="/profile.jpg"
                alt="Christoph Bühler"
                width={200}
                height={200}
                fill={false}
                className="rounded-full border-4 border-gray-200 h-[200px] w-[200px] object-cover object-top"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900">Christoph Bühler</h1>
              <p className=" text-gray-400 mb-4">MSc in Computer Science</p>
              <p className="text-xl text-gray-600 mb-4">
                Research Assistant with the{' '}
                <ExternalLink href="https://programming-group.com/">Programming Group</ExternalLink>
              </p>
              <p className="text-lg text-gray-500 mb-6">
                <ExternalLink href="https://www.unisg.ch/">University of St. Gallen</ExternalLink>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>
                    <Link href="mailto:christoph.buehler@unisg.ch">christoph.buehler@unisg.ch</Link>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>St. Gallen, Switzerland</span>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center md:justify-start justify-center text-gray-500">
                <SocialLink href="https://github.com/buehler" type="github" />
                <SocialLink href="https://www.linkedin.com/in/christoph-b%C3%BChler-a3a262270/" type="linkedin" />
                <SocialLink href="https://bsky.app/profile/me.cbue.ch" type="bluesky" />
                <SocialLink href="https://scholar.google.com/citations?user=xSxjuaUAAAAJ&hl=en" type="scholar" />
                <SocialLink href="https://orcid.org/0000-0002-2224-1687" type="orcid" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          <div className="space-y-2 max-w-none text-gray-700 ">
            <p>
              I am a research assistant with the Programming group at the University of St. Gallen. I am working on recent
              topics in the context of Software Engineering. Currently, my goal is to improve the current state of
              Infrastructure as Code (IaC) as well as Security in the context of the AI age.
            </p>
            <p>
              I joined the programming group in July 2024, after nine wonderful years at{' '}
              <ExternalLink href="https://smartive.ch">smartive AG</ExternalLink> in St. Gallen, Switzerland. My passion for
              exploring new technologies and solving complex problems has always driven my learning process. My{' '}
              <ExternalLink href="https://buehler.github.io/mse-master-thesis/report.pdf">Master Thesis</ExternalLink> of the{' '}
              <ExternalLink href="https://www.ost.ch/">university of applied science OST</ExternalLink> (former HSR) resolved
              around identity security and authentication in heterogeneous systems.
            </p>
            <p>
              Since September 2024, I am enrolled in the Masters program in Computer Science at the University of St. Gallen,
              after which I will continue my research in the Programming group - enrolling in the PhD program under the
              supervision of{' '}
              <ExternalLink href="https://www.unisg.ch/de/universitaet/ueber-uns/organisation/detail/person-id/cf6927f1-00d5-4edb-9e0d-551d784cbb87/">
                Prof. Dr. Guido Salvaneschi
              </ExternalLink>
              .
            </p>
            <p>
              When I am not trying out new technologies or working on my research, I enjoy spending time with my beautiful
              wife and our kid. I also love playing video games, snowboarding, and Lindy Hop dancing.
            </p>
          </div>
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
