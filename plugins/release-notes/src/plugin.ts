import { releaseNotesApiRef, ReleaseNotesClient } from './api';
import {
  createApiFactory,
  createPlugin,
  createComponentExtension,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes';

export const releaseNotesPlugin = createPlugin({
  id: 'release-notes',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: releaseNotesApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
      },
      factory: ({ discoveryApi, fetchApi }) =>
        new ReleaseNotesClient({ discoveryApi, fetchApi }),
    }),
  ],
});

export const EntityReleaseNotesContent = releaseNotesPlugin.provide(
  createRoutableExtension({
    name: 'EntityReleaseNotesContent',
    component: () =>
      import('./components/ReleaseNotesContent').then(
        m => m.ReleaseNotesContent,
      ),
    mountPoint: rootRouteRef,
  }),
);

export const HomePageReleaseNotesCard = releaseNotesPlugin.provide(
  createComponentExtension({
    name: 'HomePageReleaseNotesCard',
    component: {
      lazy: () =>
        import('./components/ReleaseNotesCard').then(m => m.ReleaseNotesCard),
    },
  }),
);
