import {defineField, defineType} from 'sanity'

export const teamYearType = defineType({
  name: 'teamYear',
  title: 'Team Year',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Core 2026"',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'The academic year (e.g., 2026)',
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'linkedin',
              title: 'LinkedIn URL',
              type: 'url',
            }),
            defineField({
              name: 'github',
              title: 'GitHub URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'position',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'year',
    },
  },
  orderings: [
    {
      title: 'Year',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
})
