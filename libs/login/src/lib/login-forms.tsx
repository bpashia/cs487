import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';
import { LoginFields } from './login-fields';
import { Login } from './login.interfaces';
import { loginSchema } from './login.schema';
import { User } from '@interfaces';
import { Redirect } from 'react-router';
import {
  Snackbar,
  PostCard,
  EditableCard,
  Grid,
  CardContent,
  Typography,
  usePostCardStyles,
} from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import { allUsers, selectedUser } from '@cs487-app/state';
import { CardMedia } from '@material-ui/core';

const tempPost = {
  id: 1,
  tags: [{ tagKeyword: 'Soccer' }],
  postedByEmail: 'bpashia@hawk.iit.edu',
  postedById: 1,
  title: 'Soccer Practice',
  content: null,
  createdAt: new Date(),
};
export const LoginForm = () => {
  const classes = usePostCardStyles();
  const loginInit = loginSchema.cast({});
  const [allCurrentUsers, setAllUsers] = useRecoilState(allUsers);
  const [currentSelectedUser, setSelectedUser] = useRecoilState(selectedUser);

  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);

  const loginCustomer = (email: string, password: string): User => {
    if (!email || !password) return null;
    const userForLogInAttempt = allCurrentUsers.find(
      (usr) => usr.email === email
    );
    const result =
      !!userForLogInAttempt && !!userForLogInAttempt.password
        ? password === userForLogInAttempt.password
          ? userForLogInAttempt
          : null
        : null;
    if (!result) {
      setErrorOpen(true);
    } else {
      setSelectedUser(result);
    }
    return result;
  };
  const onSubmit = (values, actions) => {
    console.log('HERE');
    loginCustomer(values.email, values.password);
    actions.setSubmitting(false);
  };

  // React.useEffect(() => {
  //   console.log({ result });
  //   if (result.error || (result.value && !result.value.length)) {
  //     setErrorOpen(true);
  //   }
  //   if (result.value && result.value.length) {
  //     setActiveCustomer(result.value[0]);
  //   }
  // }, [result, setActiveCustomer]);
  console.log({ currentSelectedUser });
  return (
    <>
      {/* <PostCard post={tempPost} />
      <EditableCard
        key={'1'}
        inEditMode={false}
        setInEditMode={() => {
          //
        }}
        toggleEditMode={() => {
          //
        }}
        title="Soccer Practice"
        getContent={() => (
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSanhpEpEcwpqrkhfqiAJUttIYgqi5z0mSJBg&usqp=CAU'
                }
                title="Contemplative Reptile"
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        )}
      /> */}
      <Formik<Login>
        initialValues={loginInit}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        enableReinitialize={true}
      >
        <Form>
          <LoginFields />
        </Form>
      </Formik>
      {currentSelectedUser ? <Redirect to={'./account'} /> : <div />}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error">
          Invalid Login. Please try a different email/password.
        </Alert>
      </Snackbar>
    </>
  );
};
