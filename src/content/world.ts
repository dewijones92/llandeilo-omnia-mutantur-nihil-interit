import type { WorldContent } from '../domain/state.ts';
import { SOURCES } from './sources.ts';
import { ENVIRONMENT, ERAS, TIMELINE } from './timeline.ts';

export const WORLD_CONTENT: WorldContent = {
  timeline: TIMELINE,
  eras: ERAS,
  environment: ENVIRONMENT,
  places: [],
  events: [],
  features: [],
  people: [],
  conversations: [],
  almanac: [],
  language: [],
  sources: SOURCES,
};
