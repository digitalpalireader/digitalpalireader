import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { DoubleArrow, Menu } from '@material-ui/icons';
import { Grid, Typography, Button, NativeSelect, Box } from '@material-ui/core';

interface HierarchySelectorProps {
  isParentNode: boolean;
  isLeafNode: boolean;
}

const useStylesHierarchySelector = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '0px 0px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      elevation: 0,
    },
    button: {
      width: '100%',
      textTransform: 'none',
      fontWeight: 'bold',
    },
    iconButton: {
      fontSize: 'small',
      padding: 5,
    },
    formControl: {
      margin: theme.spacing(0),
    },
  }),
);

const HierarchySelector: React.SFC<HierarchySelectorProps> = ({ isParentNode, isLeafNode }) => {
  const classes = useStylesHierarchySelector();

  return (
    <Paper className={classes.paper} square>
      {isParentNode ? (
        <Button className={classes.button}>asdad</Button>
      ) : (
        <NativeSelect disableUnderline fullWidth>
          <option value={10}>Ten1</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      )}
      <IconButton className={classes.iconButton}>{isLeafNode ? <DoubleArrow /> : <Menu />}</IconButton>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0),
    },
  }),
);

export default function NavigationBookHierarchy() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" alignContent="stretch">
      <Grid item xs={12}>
        <Typography variant="subtitle1" align="center">
          <Box fontWeight="bold">Book Hierarchy</Box>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <HierarchySelector isParentNode isLeafNode={false} />
      </Grid>
      <Grid item xs={12}>
        <HierarchySelector isParentNode={false} isLeafNode={false} />
      </Grid>
      <Grid item xs={12}>
        <HierarchySelector isParentNode={false} isLeafNode />
      </Grid>
    </Grid>
  );
}
