import { SiLinkedin, SiGithub } from 'react-icons/si';
import CardComponent from '../card/Card';

// type CardProps = React.ComponentProps<typeof Projects>;

interface Project {
  className?: string;
  title: string;
  description: string;
  linkDemo: string;
  linkRepo: string;
  tools: Tool[];
  id: number;
}

import { ComponentType, SVGProps } from 'react';

interface Tool {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
}

interface ProjectsProps {
  className?: string;
  projects: Project[];
}

const Projects = ({ className, projects, ...props }: ProjectsProps) => {
  return (
    <>
      {projects.map((project, index) => (
        <CardComponent
          key={index}
          id={project.id}
          className={`${className} space-y-2`}
          title={project.title}
          description={project.description}
          linkDemo={project.linkDemo}
          linkRepo={project.linkRepo}
          tools={project.tools}
          {...props}
        />
      ))}
    </>
  );
};

export const connectFooter = [
  {
    name: 'React',
    icon: SiLinkedin,
  },
  {
    name: 'Next.js',
    icon: SiGithub,
  },
];

export default Projects;
