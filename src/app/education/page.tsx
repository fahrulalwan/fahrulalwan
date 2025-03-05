import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GraduationCap, Calendar, Award, Trophy, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import type { FC } from 'react';

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  keyActivities: string[];
  achievements: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
}

const educationData: Education[] = [
  {
    degree: 'Vocational Degree in Access Network',
    institution: 'SMK Telkom Jakarta',
    period: '2014 - 2017',
    description:
      'The program focuses on telecommunications technology and access network systems. The program includes dynamic and disciplined education and training in telecommunications technology and information communication technology.',
    keyActivities: ['Completed internship at PT Telkom Indonesia'],
    achievements: [],
  },
  {
    degree: 'Bachelor of Information Systems',
    institution: 'Bina Nusantara University',
    period: '2018 - 2022',
    description:
      'The program integrates computing and business to develop competencies in information systems management, computing technology, databases, business processes, project management, and IS auditing.',
    keyActivities: ['Act as class leader in college major'],
    achievements: ['Graduated with Summa Cum Laude (GPA: 3.76/4.0)'],
  },
];

const certificationData: Certification[] = [
  {
    name: 'Cisco Certified Network Associate (CCNA)',
    issuer: 'Cisco',
    date: '2016',
    description:
      'Demonstrated knowledge and skills in networking fundamentals, network access, IP connectivity, IP services, security fundamentals, and automation and programmability.',
  },
  {
    name: 'Angular (Basic) Certificate',
    issuer: 'HackerRank',
    date: 'Jul 2022',
    description:
      'Demonstrated skills in building applications using Angular, including components, services, and routing.',
  },
  {
    name: 'Frontend Developer (React) Certificate',
    issuer: 'HackerRank',
    date: 'Jan 2025',
    description:
      'Demonstrated an understanding of React, including hooks, state management, and working with APIs.',
  },
  {
    name: 'The AI Engineer Path',
    issuer: 'Scrimba',
    date: 'Jan 2024',
    description:
      'Comprehensive training in AI engineering covering Prompt Engineering, LangChain, OpenAI API integration, Vector Databases, and ReAct patterns for building AI-powered applications.',
  },
];

export const metadata: Metadata = {
  title: 'Education',
};

const EducationPage: FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center mt-4">Education</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="size-6" />
            Education
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {educationData.map((edu) => (
              <Card key={edu.degree}>
                <CardHeader>
                  <CardTitle className="text-xl">{edu.degree}</CardTitle>
                  <CardDescription>{edu.institution}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-4" />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-sm">{edu.description}</p>

                  {!!edu.keyActivities.length && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="size-4" />
                        Key Activities:
                      </h4>
                      <ul className="list-disc list-outside space-y-1 pl-4 text-sm">
                        {edu.keyActivities.map((activity) => (
                          <li key={activity}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {!!edu.achievements.length && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Trophy className="size-4" />
                        Achievements:
                      </h4>
                      <ul className="list-disc list-outside space-y-1 pl-4 text-sm">
                        {edu.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Award className="size-6" />
            Certification
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {certificationData.map((cert) => (
              <Card key={cert.name}>
                <CardHeader>
                  <CardTitle className="text-xl">{cert.name}</CardTitle>
                  <CardDescription>{cert.issuer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="size-4" />
                    <span>{cert.date}</span>
                  </div>
                  <p className="text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default EducationPage;
