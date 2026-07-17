import {
  ApiBlueprint,
  createFrontendPlugin,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/frontend-plugin-api';
import { EntityContentBlueprint } from '@backstage/plugin-catalog-react/alpha';
import { releaseNotesApiRef, ReleaseNotesClient } from './api';
import { rootRouteRef } from './routes';

const releaseNotesApi = ApiBlueprint.make({
  name: 'releaseNotesApi',
  params: defineParams =>
    defineParams({
      api: releaseNotesApiRef,
      deps: { fetchApi: fetchApiRef, discoveryApi: discoveryApiRef },
      factory: ({ fetchApi, discoveryApi }) =>
        new ReleaseNotesClient({ fetchApi, discoveryApi }),
    }),
});

const releaseNotesEntityContent = EntityContentBlueprint.make({
  name: 'releaseNotesEntityContent',
  params: {
    path: 'release-notes',
    title: 'Release Notes',
    routeRef: rootRouteRef,
    filter: 'kind:component,resource,api',
    loader: () =>
      import('./components/ReleaseNotesContent').then(m => (
        <m.ReleaseNotesContent />
      )),
  },
});

export const releaseNotesPlugin = createFrontendPlugin({
  pluginId: 'release-notes',
  info: {
    packageJson: () => import('../package.json'),
  },
  routes: {
    root: rootRouteRef,
  },
  extensions: [releaseNotesApi, releaseNotesEntityContent],
});
