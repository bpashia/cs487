import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, createStyles, Typography, fade, Link } from '../material';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    link: {
      display: 'flex',
      lineHeight: 1.5,
    },
    icon: {
      lineHeight: 1.5,
      marginRight: theme.spacing(1),
    },
  })
);

export interface JumpLinkProps {
  to?: string;
  text: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
}

const Title = ({ text }) => <Typography color="primary">{text}</Typography>;

export const JumpLink = ({ icon, to, text, label }: JumpLinkProps) => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      {/* {label && <Subtitle text={label} />} */}
      {to ? (
        <RouterLink className={classes.link} to={to} component={Link}>
          <>
            {icon ? <span className={classes.icon}>{icon}</span> : null}
            <Title text={text} />
          </>
        </RouterLink>
      ) : (
        <div className={classes.link}>
          {icon ? <span className={classes.icon}>{icon}</span> : null}
          <span>
            <Title text={text} />
          </span>
        </div>
      )}
    </div>
  );
};

export default JumpLink;
