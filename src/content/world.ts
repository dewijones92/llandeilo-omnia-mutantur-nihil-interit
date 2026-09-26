import type { WorldContent } from '../domain/state.ts';
import { EVENTS } from './events.ts';
import { FEATURES } from './features.ts';
import { PLACES } from './places.ts';
import { SOURCES } from './sources.ts';
import { ENVIRONMENT, ERAS, TIMELINE } from './timeline.ts';

export const WORLD_CONTENT: WorldContent = {
  timeline: TIMELINE,
  eras: ERAS,
  environment: ENVIRONMENT,
  places: PLACES,
  events: EVENTS,
  features: FEATURES,
  people: [],
  conversations: [],
  almanac: [],
  language: [],
  sources: SOURCES,
};
