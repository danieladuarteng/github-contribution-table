import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#24292e'
  },
  button: {
    minWidth: '10px',
    minHeight: '10px',
  },
  root: {
    margin: '0',
    padding: '0',
    minWidth: '10px',
    minHeight: '10px',
    lineHeight: '0',
    lineWidth: '0'
  },
  color0: {
    background: '#bedf0'
  }
}));

export const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: '#24292e',
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#fff'
  },
}));

export function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}