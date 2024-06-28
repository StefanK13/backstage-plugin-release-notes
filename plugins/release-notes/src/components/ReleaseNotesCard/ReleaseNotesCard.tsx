import React, { useState } from 'react';
import { Release } from '../../api';
import { useReleases } from '../../hooks/useReleases';
import {
  InfoCard,
  MarkdownContent,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Divider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { useReleaseNotesCardStyles } from './styles';
import { ReleaseNotesMenu } from '../ReleaseNotesMenu';

type ReleaseNotesCardProps = {
  slug: string;
  title: string;
};

export const ReleaseNotesCard = ({ slug, title }: ReleaseNotesCardProps) => {
  const classes = useReleaseNotesCardStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { releases, totalPages, loading, error } = useReleases(
    slug,
    currentPage,
  );

  const handleReleaseClick = (release: Release) => {
    setSelectedRelease(release);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRelease(null);
  };

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
    <>
      <InfoCard title={title} noPadding>
        <ReleaseNotesMenu
          isFetchingReleases={loading}
          releases={releases}
          selectedRelease={selectedRelease}
          handleReleaseClick={handleReleaseClick}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageClick={page => setCurrentPage(page)}
        />
      </InfoCard>

      {selectedRelease && (
        <Dialog onClose={handleCloseDialog} open={openDialog} maxWidth="md">
          <DialogTitle disableTypography className={classes.dialogTitle}>
            <Typography variant="h5" className={classes.dialogTitleTypography}>
              {selectedRelease.name}
            </Typography>
            <IconButton
              className={classes.dialogCloseButton}
              onClick={handleCloseDialog}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <MarkdownContent content={selectedRelease.description} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
