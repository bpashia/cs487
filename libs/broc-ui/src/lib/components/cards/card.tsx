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
} from '../../material';
import { BrsCardContent } from './card-content';
import { useMedia } from 'react-use';

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

interface BrsCardProps {
  icon?: ReactNode;
  title: ReactNode;
  action?: ReactNode;
  content: ReactNode;
  subheader?: string | ReactNode;
  Status?: () => ReactNode;
}

export function BrsCard({
  icon,
  title,
  action,
  content,
  subheader,
  Status,
}: BrsCardProps) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const widthCheck = useMedia('(max-width: 1320px)');
  return (
    <div className={classes.root}>
      <Card>
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
        {!!widthCheck && <br />}
        {!!Status && (
          <Box marginTop={-5.5} marginBottom={4} marginLeft={widthCheck && 8}>
            <Typography align={!widthCheck ? 'center' : 'left'}>
              {Status()}
            </Typography>
          </Box>
        )}
        <BrsCardContent>{content}</BrsCardContent>
      </Card>
    </div>
  );
}
export default BrsCard;
