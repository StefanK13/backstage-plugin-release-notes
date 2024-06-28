import React, { useState } from 'react';
import { Release } from '../../api';
import { Entity } from '@backstage/catalog-model';
import { useReleases } from '../../hooks/useReleases';
import {
  InfoCard,
  MarkdownContent,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  useEntity,
  MissingAnnotationEmptyState,
} from '@backstage/plugin-catalog-react';
import { ReleaseNotesMenu } from '../ReleaseNotesMenu';

const RELEASE_NOTES_ANNOTATION = 'gitlab.com/project-slug';

const isReleaseNotesAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[RELEASE_NOTES_ANNOTATION]);

const ReleaseNotes = ({ entity }: { entity: Entity }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const { releases, totalPages, loading, error } = useReleases(
    entity.metadata.annotations?.[RELEASE_NOTES_ANNOTATION] ?? '',
    currentPage,
  );

  if (!selectedRelease && releases.length > 0) {
    setSelectedRelease(releases[0]);
  }

  if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  if (loading && releases.length === 0) {
    return <Progress />;
  }

  if (!loading && releases.length === 0) {
    return (
      <Alert severity="info">
        It seems that there has not been done a release yet, start with your
        first release to make use of this plugin!
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <InfoCard title="Releases" noPadding>
          <ReleaseNotesMenu
            isFetchingReleases={loading}
            releases={releases}
            selectedRelease={selectedRelease}
            handleReleaseClick={release => setSelectedRelease(release)}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageClick={page => setCurrentPage(page)}
          />
        </InfoCard>
      </Grid>
      <Grid item xs={12} md={9}>
        {selectedRelease && (
          <InfoCard title={selectedRelease.name}>
            <MarkdownContent content={selectedRelease.description} />
          </InfoCard>
        )}
      </Grid>
    </Grid>
  );
};

export const ReleaseNotesContent = () => {
  const { entity } = useEntity();

  if (!isReleaseNotesAvailable(entity)) {
    return (
      <MissingAnnotationEmptyState annotation={RELEASE_NOTES_ANNOTATION} />
    );
  }

  return <ReleaseNotes entity={entity} />;
};
