export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'oneLiner',
      title: 'One Liner',
      type: 'string',
      description: 'A punchy, single-sentence description.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the project.',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of technologies used (e.g., Next.js, Tailwind CSS)',
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'star',
      title: 'S.T.A.R. Method',
      type: 'object',
      description: 'Situation, Task, Action, Result',
      fields: [
        { name: 'situation', title: 'Situation', type: 'text' },
        { name: 'task', title: 'Task', type: 'text' },
        { name: 'action', title: 'Action', type: 'text' },
        { name: 'result', title: 'Result', type: 'text' },
      ],
    },
  ],
};
