import type { WorldContent } from '../domain/state.ts';
import { ALMANAC } from './almanac.ts';
import { CLIMATE } from './climate.ts';
import { CONVERSATIONS } from './conversations.ts';
import { EVENTS } from './events.ts';
import { FEATURES } from './features.ts';
import { LAMPLIGHT } from './lamplight.ts';
import { LANGUAGE } from './language.ts';
import { PEOPLE } from './people.ts';
import { PLACES } from './places.ts';
import { SOURCES } from './sources.ts';
import { ENVIRONMENT, ERAS, TIMELINE } from './timeline.ts';

export const WORLD_CONTENT: WorldContent = {
  timeline: TIMELINE,
  eras: ERAS,
  environment: ENVIRONMENT,
  climate: CLIMATE,
  lamplight: LAMPLIGHT,
  places: PLACES,
  events: EVENTS,
  features: FEATURES,
  people: PEOPLE,
  conversations: CONVERSATIONS,
  almanac: ALMANAC,
  language: LANGUAGE,
  sources: SOURCES,
};
