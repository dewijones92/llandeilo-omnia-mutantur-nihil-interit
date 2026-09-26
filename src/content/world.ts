import type { WorldContent } from '../domain/state.ts';
import { CONVERSATIONS } from './conversations.ts';
import { EVENTS } from './events.ts';
import { FEATURES } from './features.ts';
import { PEOPLE } from './people.ts';
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
  people: PEOPLE,
  conversations: CONVERSATIONS,
  almanac: [],
  language: [],
  sources: SOURCES,
};
