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
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import NewReleases from '@material-ui/icons/NewReleases';
import { Pagination } from '@material-ui/lab';
import { useReleaseNoteContentStyles } from './styles';
import {
  useEntity,
  MissingAnnotationEmptyState,
} from '@backstage/plugin-catalog-react';

const RELEASE_NOTES_ANNOTATION = 'gitlab.com/project-slug';

const isReleaseNotesAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[RELEASE_NOTES_ANNOTATION]);

const ReleaseNotes = ({ entity }: { entity: Entity }) => {
  const classes = useReleaseNoteContentStyles();
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

  if (loading && !selectedRelease) {
    return <Progress />;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        {selectedRelease && (
          <InfoCard title="Releases" noPadding>
            <MenuList className={classes.menuList}>
              {loading && (
                <CircularProgress
                  size="2.5rem"
                  className={classes.boxCircularProgress}
                />
              )}
              {releases.map(release => {
                const isSelected =
                  selectedRelease.tag_name === release.tag_name;

                return (
                  <MenuItem
                    key={release.tag_name}
                    className={classes.menuItem}
                    selected={isSelected}
                    disabled={loading}
                    onClick={() => setSelectedRelease(release)}
                  >
                    <ListItemIcon
                      className={`
                      ${classes.listItemIcon} 
                      ${isSelected && classes.listItemIconSelected}`}
                    >
                      <NewReleases />
                    </ListItemIcon>
                    <Typography>{release.name}</Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
            <Divider />
            <Box className={classes.boxPagination}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                size="small"
              />
            </Box>
          </InfoCard>
        )}
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
