import {
  ScmAuth,
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
} from '@backstage/integration-react';
import { configApiRef } from '@backstage/core-plugin-api';
import {
  ApiBlueprint,
  ExtensionDefinition,
} from '@backstage/frontend-plugin-api';

const scmIntegrationsApi = ApiBlueprint.make({
  name: 'scm-integrations',
  params: define =>
    define({
      api: scmIntegrationsApiRef,
      deps: { configApi: configApiRef },
      factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
    }),
});

const scmAuthApi = ApiBlueprint.make({
  name: 'scm-auth',
  params: define => define(ScmAuth.createDefaultApiFactory()),
});

export const apis: ExtensionDefinition[] = [scmIntegrationsApi, scmAuthApi];
