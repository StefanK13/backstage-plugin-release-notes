import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import scaffolderPlugin from '@backstage/plugin-scaffolder/alpha';
import techdocsPlugin from '@backstage/plugin-techdocs/alpha';
import searchPlugin from '@backstage/plugin-search/alpha';
import userSettingsPlugin from '@backstage/plugin-user-settings/alpha';
import { navModule } from './components/Root';
import { appOverride } from './overrides/app';
import { homeModule } from './components/home/HomePage';
import { releaseNotesPlugin } from '@stefank13/backstage-plugin-release-notes';

const app = createApp({
  features: [
    appOverride,
    catalogPlugin,
    scaffolderPlugin,
    techdocsPlugin,
    searchPlugin,
    userSettingsPlugin,
    navModule,
    homeModule,
    releaseNotesPlugin,
  ],
});

export default app.createRoot();
