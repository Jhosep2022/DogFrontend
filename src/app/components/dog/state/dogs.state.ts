import { createEntity, createState } from '@ngneat/elf';
import { Dog } from '../../models/dog';

export const {
  state: dogEntitiesState,
  config: dogEntitiesConfig,
} = createEntity<Dog>({ name: 'dog' });

// estado inicial
export const {
  state: dogState,
  config: dogConfig
} = createState(dogEntitiesState, { name: 'dog' });

