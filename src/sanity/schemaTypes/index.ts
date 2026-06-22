import { type SchemaTypeDefinition } from 'sanity'
import { projectSchema } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectSchema],
}
