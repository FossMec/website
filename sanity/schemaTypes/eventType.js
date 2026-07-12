import {defineField, defineType} from 'sanity'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'event_oneline',
      title: 'Oneliner Text',
      type: 'string',
    }),
    defineField({
      name: 'event_short_desc',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'event_content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'event_venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'date_label',
      title: 'Date Label',
      type: 'string',
      description: 'Optional custom label e.g. "March 2025", "2024-2025". Falls back to year number if empty.',
    }),
    defineField({
      name: 'cover_image',
      title: 'Cover Image',
      type: 'image',
    }),
    defineField({
      name: 'gallery_images',
      title: 'Gallery Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],
});
