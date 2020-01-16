import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { HelpOutline, DoubleArrow } from '@material-ui/icons';
import { Grid, Popover, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      fontSize: 'small',
      padding: 5,
    },
    typography: {
      padding: theme.spacing(0),
    },
  }),
);

export default function NavigationQuickLinks() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Grid container justify="center" alignContent="stretch">
        <Paper className={classes.root}>
          <IconButton className={classes.iconButton} onClick={handleClick}>
            <HelpOutline />
          </IconButton>
          <InputBase className={classes.input} placeholder="Quick links" />
          <IconButton className={classes.iconButton}>
            <DoubleArrow />
          </IconButton>
        </Paper>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          Use this box to quickly navigate to a specific sutta, section, etc.. Quick links are of two forms, as follows:
        </Typography>
        <Typography className={classes.typography}>
          1. 'DN1.1', 'MN1', etc., comprised of the first letter of the nikaya (D,M,S,A, or K), then an N, then the first reference number,
          then a period, then the second reference number. The N is now optional, so D1.1 also works.
        </Typography>
        <Typography className={classes.typography}>
          2. For the first fifteen books in the Khuddaka Nikaya, the following syntax is also recognized: 'dhp1', 'it1', etc., comprised of
          the shorthand name for that book, followed by the reference number. The shorthand names for the books are, in order:
        </Typography>
        <Typography className={classes.typography}>'khp','dhp','ud','it','snp','vv','pv','th','thi','apa','api','bv','cp','ja'</Typography>
        <Typography className={classes.typography}>
          Note, for the Jataka (ja), this syntax represents the jataka number, so 'ja547' will open the last jataka in book 15 (Jat. 2),
          whereas 'ja520' will open the last jataka in book 14 (Jat. 1).'
        </Typography>
        <Typography className={classes.typography}>
          Dhammapada verses are also recognized, using 'dhpv' followed by the verse number, e.g.: 'dhpv1', 'dhpv423', etc.
        </Typography>
      </Popover>
    </>
  );
}
