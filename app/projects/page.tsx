import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import allProjects from '@/.content-collections/generated/allProjects';
import Container from '@/components/container';
import EmptyState from '@/components/empty-state';
import PageHeader from '@/components/page-header';
import { ROUTES } from '@/constants/routes';
import ProjectCard from '@/features/projects/components/project-card';
import { seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

export const metadata: Metadata = seo({
  title: 'Projects',
  description: 'A collection of finest projects that I have built.',
  keywords: [
    'projects',
    'development',
    'app',
    'portfolio',
    'programming',
    'tech',
    'software',
  ],
  url: ROUTES.projects,
});

const ProjectsPage = () => {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <>
      <PageHeader
        title="Projects"
        description="A collection of finest projects that I have built. ❤️️"
      />
      <Container>
        {projects.length ? (
          <div
            className={cn(
              'grid w-full auto-cols-fr grid-cols-1 gap-4',
              'md:grid-cols-2',
            )}
          >
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState message="The projects are probably off having a party somewhere without us!" />
        )}
      </Container>
    </>
  );
};

export default ProjectsPage;
