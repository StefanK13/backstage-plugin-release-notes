import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const releaseNotesPlugin = createPlugin({
  id: 'release-notes',
  routes: {
    root: rootRouteRef,
  },
});

export const EntityReleaseNotesContent = releaseNotesPlugin.provide(
  createRoutableExtension({
    name: 'EntityReleaseNotesContent',
    component: () =>
      import('./components/ReleaseNotesContent').then(m => m.ReleaseNotesContent),
    mountPoint: rootRouteRef,
  }),
);
