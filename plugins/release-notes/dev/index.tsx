import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { releaseNotesPlugin, ReleaseNotesPage } from '../src/plugin';

createDevApp()
  .registerPlugin(releaseNotesPlugin)
  .addPage({
    element: <ReleaseNotesPage />,
    title: 'Root Page',
    path: '/release-notes',
  })
  .render();
