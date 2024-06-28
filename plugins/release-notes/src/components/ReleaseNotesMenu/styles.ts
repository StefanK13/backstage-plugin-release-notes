import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useReleaseNotesMenuStyles = makeStyles((theme: Theme) => ({
  boxCircularProgress: {
    position: 'absolute',
    left: 'calc(50% - 1.25rem)',
    top: 'calc(50% - 1.25rem)',
  },
  menuList: {
    padding: 0,
  },
  menuItem: {
    minHeight: theme.spacing(6),
    whiteSpace: 'normal',
  },
  listItemIcon: {
    minWidth: theme.spacing(4),
  },
  listItemIconSelected: {
    color: theme.palette.primary.main,
  },
  boxPagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: theme.spacing(6),
  },
}));
