import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { releaseNotesPlugin, EntityReleaseNotesContent } from '../src/plugin';

createDevApp()
  .registerPlugin(releaseNotesPlugin)
  .addPage({
    element: <EntityReleaseNotesContent />,
    title: 'Root Page',
    path: '/release-notes',
  })
  .render();
