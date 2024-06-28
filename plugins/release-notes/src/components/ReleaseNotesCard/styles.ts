import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useReleaseNotesCardStyles = makeStyles((theme: Theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogTitleTypography: {
    marginBottom: 0,
  },
  dialogCloseButton: {
    marginLeft: theme.spacing(2),
  },
}));
