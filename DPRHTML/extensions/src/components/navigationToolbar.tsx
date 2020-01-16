import React from 'react';
import { Button, Divider, Tooltip, makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import * as I from '@material-ui/icons';

interface ToolbarItem {
  text: string;
  toolTip: string;
  icon?: React.ReactNode;
}

const toolbarItems: Nullable<ToolbarItem>[] = [
  { text: 'Convert', toolTip: 'Send text to converter (s)' },
  { text: 'Export', toolTip: 'Send text to textpad (e)' },
  { text: 'Save', toolTip: 'Save text to desktop' },
  null,
  { text: 'Sync sidebar', toolTip: 'Copy place to sidebar', icon: <I.SyncAlt fontSize="small" /> },
  { text: 'Copy deep', toolTip: 'Copy permalink to clipboard', icon: <I.Link fontSize="small" /> },
  null,
  { text: 'Previous', toolTip: 'Go to previous section', icon: <I.ChevronLeft fontSize="small" /> },
  { text: 'Index', toolTip: 'Go to index', icon: <I.List fontSize="small" /> },
  { text: 'Next', toolTip: 'Go to next section', icon: <I.ChevronRight fontSize="small" /> },
  null,
  { text: 'M', toolTip: 'Relative section in Mūla', icon: null },
  { text: 'A', toolTip: 'Relative section in Aṭṭhakathā', icon: null },
  { text: 'T', toolTip: 'Relative section in Ṭīkā', icon: null },
  null,
  { text: 'Convert', toolTip: 'Bookmark section', icon: <I.Bookmark fontSize="small" /> },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {},
    button: {
      color: theme.palette.text.primary,
    },
  }),
);

const createToolbarButton = (classes: any) => (tbi: Nullable<ToolbarItem>, i: number) => {
  if (tbi) {
    return (
      <Tooltip key={i} title={tbi.toolTip}>
        <Button className={classes.button}>{tbi.icon ? tbi.icon : tbi.text}</Button>
      </Tooltip>
    );
  }

  return <Divider key={i} orientation="vertical" />;
};

export default function NavigationToolbar() {
  const classes = useStyles();

  return <Grid container>{toolbarItems.map(createToolbarButton(classes))}</Grid>;
}
