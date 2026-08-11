import { z } from 'zod';
import { IdSchema } from '../schemas/index.js';

export type Id = z.infer<typeof IdSchema>;
