import { z } from 'zod';
import { IdSchema } from '../schemas';

export type Id = z.infer<typeof IdSchema>;
