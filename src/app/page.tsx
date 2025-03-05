import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import profileImage from '../../public/profile.webp';

const menus = [
  {
    title: 'About Me',
    description: 'Learn more about my background and aspirations',
    link: '/about',
  },
  {
    title: 'Experience',
    description: 'Explore my professional journey and projects',
    link: '/experience',
  },
  {
    title: 'Projects',
    description: 'View my notable projects and contributions',
    link: '/projects',
  },
  {
    title: 'Skills',
    description: 'Skills and expertises I have learned throughout my career',
    link: '/skills',
  },
  {
    title: 'Education',
    description: 'Learn about my academic achievements and certifications',
    link: '/education',
  },
  // {
  // 	title: "Blog",
  // 	description: "Read my latest thoughts and musings on technology",
  // 	link: "/blog",
  // }
];

const AppPage = () => {
  return (
    <div className="*:mx-auto text-center">
      <div className="mb-6 sm:mb-8 size-40 rounded-full overflow-hidden">
        <Image
          src={profileImage}
          width={160}
          height={160}
          alt="Mohammad Fahrul Alwan Profile Image"
          priority
        />
      </div>

      <header className="mb-5 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">
          Mohammad Fahrul Alwan
        </h1>
        <h2 className="text-lg sm:text-xl text-lime-900 dark:text-lime-50 font-medium">
          Senior Frontend Engineer & Tech Lead
        </h2>
      </header>

      <div className="max-w-2xl mb-8 sm:mb-12">
        <p className="sm:text-lg mb-4">
          An M-shaped professional with a passion for structured thinking,
          business impact, and innovative solutions. Bridging the gap between
          technology and business objectives.
        </p>
        <p className="sm:text-lg mb-4">
          With 11+ years of IT-focused learning and 7+ years of coding
          experience, I specialize in creating robust and scalable web
          applications using modern JavaScript frameworks.
        </p>
        <p className="sm:text-lg">
          I&apos;m passionate about solving complex problems and driving
          business impact through innovative technology solutions.
        </p>
      </div>

      <div className="space-x-4 mb-8 sm:mb-12">
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://github.com/fahrulalwan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link
            href="https://linkedin.com/in/fahrulalwan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="size-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <Link href="mailto:fahrulalwan@gmail.com">
            <Mail className="size-6" />
            <span className="sr-only">Email</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {menus.map((menu) => (
          <Link href={menu.link} key={menu.title}>
            <Card className="hover:bg-accent transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  {menu.title}
                  <ChevronRight className="size-5" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{menu.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppPage;
