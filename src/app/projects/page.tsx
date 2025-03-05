import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, ExternalLink, Tag } from 'lucide-react';
import Image from 'next/image';
import project_lanthera from '../../../public/projects/project-lanthera.webp';
import project_treetan from '../../../public/projects/project-treetan.webp';
import project_xl from '../../../public/projects/project-newxlife.webp';
import project_xp from '../../../public/projects/project-xprivate.webp';
import project_fifada from '../../../public/projects/project-fifada.webp';
import project_caready from '../../../public/projects/project-caready.webp';
import type { Metadata } from 'next';

const projects = [
  {
    title: 'Lanthera',
    year: '2024',
    role: 'Frontend Developer',
    category: 'Mental Health',
    description:
      'Led the frontend development of a mental health support app using React Native. Implemented complex UI interaction animations, onboarding experience, activity dashboard, connect to therapist, profile & settings page, Journaling feature, and Firebase integration.',
    technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
    link: 'https://lanthera.com',
    image: project_lanthera,
    impact:
      'Delivered a production-ready MVP within 8 months while maintaining cross-platform compatibility. Established a robust frontend architecture that scales across iOS and Android, setting strong foundations for future feature expansion.',
  },
  {
    title: 'Treetan',
    year: '2023',
    role: 'Lead Frontend Engineer',
    category: 'Travel',
    description:
      'Engineered critical business features for a comprehensive Umrah and Hajj travel platform. Implemented end-to-end document verification system, automated requirement tracking, and invoicing system.',
    technologies: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'],
    link: 'https://treetan.com',
    image: project_treetan,
    impact:
      'Established scalable development practices enabling team growth from 2 to 6 developers & increased project delivery speed by designing reusable components and modules.',
  },
  // done
  {
    title: 'NewXLife',
    year: '2021',
    role: 'Frontend Engineer',
    category: 'Enterprise',
    description:
      'Led the frontend development an internal HC Super App for XL Axiata employees from ground up, featuring dynamic form/page builder, health submission tracking, news & articles and multilingual support.',
    technologies: [
      'Angular',
      'Tailwind CSS',
      'Travis CI',
      'Docker',
      'Kubernetes',
    ],
    link: 'https://www.newxlife.xl.co.id/en',
    image: project_xl,
    impact:
      'Delivered all features ahead of schedule with zero scope compromise. Reduced deployment bottlenecks by optimizing CI/CD pipelines, cutting deployment time from 30 to under 10 minutes while maintaining reliability.',
  },
  {
    title: 'XPrivate Education',
    year: '2020',
    role: 'Full Stack Developer',
    category: 'Education',
    description:
      'Developed an end-to-end solution of a tutoring platform with a dedicated web-app for students and tutors. Implemented automated reporting system, real-time scheduling.',
    technologies: [
      'Angular',
      'RxJS',
      'TypeScript',
      'Tailwind CSS',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'Nginx',
    ],
    link: 'https://xprivate.education',
    image: project_xp,
    impact:
      'Enabled thousands successful tutoring sessions & helping scalable growth that increased operational efficiency, reduced manual work.',
  },
  {
    title: 'FIFADA',
    year: '2020',
    role: 'Frontend Developer',
    category: 'E-commerce',
    description:
      "Contributed to building a modern e-commerce platform with sophisticated cross-selling capabilities across Astra Group's product ecosystem. Implemented advanced product discovery and recommendation features.",
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Redux',
      'Material UI',
    ],
    link: 'https://fifada.com',
    image: project_fifada,
    impact:
      'Built scalable frontend technical design on complex cross-selling mechanism on the platform. Achieved 100% of the project scopes.',
  },
  {
    title: 'CAReady',
    year: '2019',
    role: 'Frontend Developer',
    category: 'Auction Commerce',
    description:
      'Built a sophisticated real-time vehicle auction platform handling concurrent bidding from both online and offline participants. Implemented robust auction management tools with fail-safe mechanisms.',
    technologies: [
      'Angular',
      'RxJS',
      'TypeScript',
      'Tailwind CSS',
      'Websockets',
    ],
    link: 'https://caready.co.id',
    image: project_caready,
    impact:
      'Implemented real-time bidding mechanism that can be joined by online & offline users while maintaining data consistency. Enabling the platform to be used in various auction events.',
  },
];

export const metadata: Metadata = {
  title: 'Projects',
};

const ProjectsPage = () => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-center mt-4">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card
            key={project.title}
            className="bg-card text-card-foreground flex flex-col"
          >
            <CardHeader>
              <CardTitle as="h2" className="text-2xl">
                {project.title}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={project.image}
                alt={`${project.title} Logo`}
                className="w-full h-48 object-contain rounded-md mb-4"
                priority={index < 2}
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Impact:</strong> {project.impact}
              </p>
            </CardContent>
            <CardFooter className="mt-auto flex-col items-start">
              <div className="grid grid-cols-2 gap-2 text-sm mb-4 w-full">
                <div className="flex items-center gap-2">
                  <Briefcase className="size-4 text-muted-foreground" />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-muted-foreground" />
                  <span>{project.category}</span>
                </div>
              </div>

              {!!project.link && (
                <Button variant="outline" asChild>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 size-4" />
                    View Project
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
