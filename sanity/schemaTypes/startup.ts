import { defineField, defineType } from 'sanity';

export const startup = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    // this is a unique identified generated based on the title of the startup
    // eg: 'this is a startup' -> 'this-is-a-startup-slug'
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    // this is essentially a FK to author
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'views',
      type: 'number',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: (Rule) =>
        Rule.min(1).max(20).required().error('Please enter a category'),
    }),
    defineField({
      name: 'image',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pitch',
      type: 'markdown',
    }),
  ],
});
