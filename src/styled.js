import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex'
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  h2: {
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    textAlign: 'left',
    fontSize: '16px'
  },
  table: {
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#586069',
    border: '1px solid #586069',
    padding: '10px 20px',
    borderRadius: '6px'
  },
  button: {
    minWidth: '10px',
    minHeight: '10px'
  },
  root: {
    margin: '0',
    padding: '0',
    minWidth: '10px',
    minHeight: '10px',
    lineHeight: '0'
  },
  legend: {
    position: 'relative',
    bottom: '-1px',
    display: 'flex',
    margin: '0 5px',
    listStyle: 'none',
    alignItems: 'center',
    justifyContent: 'flex-end;'
  },
  li: {
    width: '10px',
    height: '10px',
    margin: '2px'
  }
}));

export const useStylesGithub = makeStyles((theme) => ({
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

export function GithubTooltip(props) {
  const classes = useStylesGithub();

  return <Tooltip arrow classes={classes} {...props} />;
}