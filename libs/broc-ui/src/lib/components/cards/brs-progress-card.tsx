import React, { ReactNode } from 'react';

import clsx from 'clsx';

import {
  Card,
  CardHeader,
  CardActions,
  Typography,
  ExpandMore,
  Chip,
  Button,
  Divider,
  createStyles,
  makeStyles,
  useTheme,
  Box,
  LinearProgress,
} from '../../material';
import { BrsCardContent } from './card-content';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, Tooltip } from '@material-ui/core';
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    header: {
      display: 'flex',
      padding: theme.spacing(1, 0),
      // align- items: center;
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      paddingLeft: theme.spacing(1),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
);
const getPercent = (progress: number) => {
  if (!progress) {
    return 0;
  }
  return Math.floor(100 * progress);
};
interface BrsProgressCardProps {
  icon?: ReactNode;
  title: ReactNode;
  action?: ReactNode;
  content: ReactNode;
  subheader?: string | ReactNode;
  progress: number;
  Status?: () => ReactNode;
}

export function BrsProgressCard({
  icon,
  title,
  action,
  content,
  subheader,
  progress,
  Status,
}: BrsProgressCardProps) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const percentProgress = Math.round(progress).toString() + '%';

  return (
    <div className={classes.root}>
      <Card>
        {progress === 100 || Number.isNaN(progress) ? (
          <Tooltip title="Done">
            <LinearProgress
              variant="determinate"
              value={progress}
              color="secondary"
            />
          </Tooltip>
        ) : (
          <Tooltip title={percentProgress}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="primary"
            />
          </Tooltip>
        )}
        <CardHeader
          avatar={icon || undefined}
          disableTypography
          title={
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
          }
          subheader={subheader}
          action={action}
        />
        {!!Status && (
          <Box marginTop={-5.5} marginBottom={4}>
            <Typography align="center">{Status()}</Typography>
          </Box>
        )}
        <BrsCardContent>{content}</BrsCardContent>
      </Card>
    </div>
  );
}
export default BrsProgressCard;
