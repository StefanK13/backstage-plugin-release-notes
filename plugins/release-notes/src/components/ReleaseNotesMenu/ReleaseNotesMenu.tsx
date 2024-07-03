import React from 'react';
import {
  Box,
  CircularProgress,
  Divider,
  ListItemText,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from '@material-ui/core';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { useReleaseNotesMenuStyles } from './styles';
import { Pagination } from '@material-ui/lab';
import { Release } from '../../api';

type ReleaseNotesMenuProps = {
  isFetchingReleases: boolean;
  releases: Release[];
  selectedRelease: Release | null;
  handleReleaseClick: (release: Release) => void;
  currentPage: number;
  totalPages: number;
  handlePageClick: (page: number) => void;
};

export const ReleaseNotesMenu = ({
  isFetchingReleases,
  releases,
  selectedRelease,
  handleReleaseClick,
  totalPages,
  currentPage,
  handlePageClick,
}: ReleaseNotesMenuProps) => {
  const classes = useReleaseNotesMenuStyles();

  return (
    <>
      <MenuList className={classes.menuList}>
        {isFetchingReleases && (
          <CircularProgress
            size="2.5rem"
            className={classes.boxCircularProgress}
          />
        )}
        {releases.map(release => {
          const isSelected = selectedRelease?.tag_name === release.tag_name;
          const releaseDate = new Date(
            release.released_at,
          ).toLocaleDateString();

          return (
            <MenuItem
              key={release.tag_name}
              className={classes.menuItem}
              selected={isSelected}
              disabled={isFetchingReleases}
              onClick={() => handleReleaseClick(release)}
            >
              <ListItemIcon
                className={`
                ${classes.listItemIcon} 
                ${isSelected && classes.listItemIconSelected}`}
              >
                <NewReleasesIcon />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={<Typography>{release.name}</Typography>}
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {releaseDate}
                  </Typography>
                }
                disableTypography
              />
            </MenuItem>
          );
        })}
      </MenuList>
      <Divider />
      <Box className={classes.boxPagination}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => handlePageClick(page)}
          size="small"
        />
      </Box>
    </>
  );
};
