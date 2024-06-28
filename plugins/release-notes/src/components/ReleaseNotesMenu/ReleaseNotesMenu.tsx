import React from 'react';
import {
  Box,
  CircularProgress,
  Divider,
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
          onChange={(_, page) => handlePageClick(page)}
          size="small"
        />
      </Box>
    </>
  );
};
