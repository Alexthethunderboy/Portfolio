export interface Project {
    id: string;
    title: string;
    description: string;
    oneLiner: string;
    techStack: string[];
    thumbnail: string;
    liveUrl: string;
    githubUrl: string;
    star: {
        situation: string;
        task: string;
        action: string;
        result: string;
    };
}

export interface Skill {
    name: string;
    icon: string;
    category: 'frontend' | 'backend' | 'tools' | 'frameworks';
}

// PROJECTS array has been removed. Data is now fetched dynamically from Sanity CMS.

export const SKILLS: Skill[] = [
    { name: 'React', icon: 'react', category: 'frontend' },
    { name: 'Next.js', icon: 'nextjs', category: 'frontend' },
    { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
    { name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend' },
    { name: 'Node.js', icon: 'nodejs', category: 'backend' },
    { name: 'MongoDB', icon: 'mongodb', category: 'backend' },
    { name: 'PostgreSQL', icon: 'postgresql', category: 'backend' },
    { name: 'Prisma', icon: 'prisma', category: 'tools' },
    { name: 'Framer Motion', icon: 'framer', category: 'frontend' },
    { name: 'Git', icon: 'git', category: 'tools' },
    { name: 'Docker', icon: 'docker', category: 'tools' },
];
