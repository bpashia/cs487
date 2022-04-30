import React from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  Add,
  BrsCard,
  Card,
  CardContent,
  EditableCard,
  EditableCardProvider,
  Grid,
  PostCard,
  Typography,
  usePostCardStyles,
  Divider,
  renderDate,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  ChevronLeftIcon,
  ChevronRight,
  Tooltip,
  Badge,
  textField,
  FormLayout,
  FormRow,
  FormItem,
  BrsCardContent,
} from '@broc-ui';

import { Redirect, withRouter } from 'react-router';
import {
  allPosts,
  allUsers,
  selectedNewConversation,
  selectedPost,
  selectedUser,
} from '@cs487-app/state';
import { Button, CardMedia, IconButton } from '@material-ui/core';
import { Post, User, AppHelpers, Search, NewConversation } from '@interfaces';
import { compareAsc, compareDesc, differenceInDays } from 'date-fns';

import { AssignmentTurnedIn, Send } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import { searchSchema } from './search.schema';
import { SearchFields } from './search-fields';
import { Link } from 'react-router-dom';

export const Explore = () => {
  const classes = usePostCardStyles();
  const [allCurrentUsers, setCurrentUsers] = useRecoilState<User[]>(allUsers);

  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState<User>(
    selectedUser
  );

  const [allCurrentPosts, setCurrentPosts] = useRecoilState<Post[]>(allPosts);
  const [currentSelectedPost, setSelectedPost] = useRecoilState<Post>(
    selectedPost
  );
  const [currentUserPosts, setCurrentUserPosts] = React.useState<Post[]>(
    AppHelpers.filterAndSortPostsForUserExplore(
      currentSelectedUser,
      allCurrentPosts
    )
  );
  const [
    currentSelectedNewConversation,
    setSelectedNewConversation,
  ] = useRecoilState<NewConversation>(selectedNewConversation);
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [currentPagination, setCurrentPagination] = React.useState<Post[]>(
    [...currentUserPosts]
      .sort((pLeft, pRight) => compareDesc(pLeft.createdAt, pRight.createdAt))
      .slice(0, 5)
  );
  const [dialogState, setDialogOpen] = React.useState<boolean>(false);

  const onSubmit = (
    values: Search,
    {
      setSubmitting,
    }: {
      setSubmitting: any;
    }
  ) => {
    const searchResults = AppHelpers.searchPosts(
      values,
      allCurrentPosts,
      currentSelectedUser
    );
    setCurrentUserPosts(searchResults);
    setSubmitting(false);
  };
  React.useEffect(() => {
    if (currentSelectedPost) {
      setDialogOpen(true);
    } else {
      if (!currentSelectedPost) {
        setDialogOpen(false);
      }
    }
  }, [currentSelectedPost, setDialogOpen]);
  React.useEffect(() => {
    const paginationEnd = Math.min(
      currentUserPosts.length,
      currentPage * 5 + 5
    );

    setCurrentPagination(
      [...currentUserPosts]
        .sort((pLeft, pRight) => compareDesc(pLeft.createdAt, pRight.createdAt))
        .slice(currentPage * 5, paginationEnd)
    );
  }, [currentUserPosts, currentPage, setCurrentPagination]);
  React.useEffect(() => {
    setCurrentUserPosts(
      AppHelpers.filterAndSortPostsForUserExplore(
        currentSelectedUser,
        allCurrentPosts
      )
    );
  }, [currentSelectedUser, allCurrentPosts, setCurrentUserPosts]);

  const PostCard = ({ tempPost }: { tempPost: Post }) => (
    <EditableCard
      key={String(tempPost.id)}
      inEditMode={false}
      setInEditMode={() => {
        // setSelectedPost(tempPost);
      }}
      hideEdit={true}
      toggleEditMode={() => {
        setSelectedPost(tempPost);
      }}
      title={tempPost.title}
      additionalActions={[
        tempPost.postedById === currentSelectedUser?.id ? null : (
          <Button
            onClick={() => {
              setSelectedNewConversation({
                toEmail: tempPost.postedByEmail,
                subject: 'Reply to ' + tempPost.title,
                firstMessage: '',
                createdAt: new Date(),
              });
            }}
            startIcon={<Send />}
          >
            <Link
              to="../messages"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Message
            </Link>
          </Button>
        ),
        currentSelectedUser?.subscribedPosts?.includes(tempPost.id) ? (
          <Button
            color="primary"
            onClick={() => {
              const prevUser = currentSelectedUser;
              const userUpdate = {
                ...prevUser,
                subscribedPosts: prevUser.subscribedPosts.filter(
                  (p) => p !== tempPost.id
                ),
              };
              setCurrentSelectedUser(userUpdate);
              setCurrentUsers([
                ...allCurrentUsers.filter((u) => u.id !== userUpdate.id),
                userUpdate,
              ]);
            }}
            startIcon={<AssignmentTurnedIn />}
          >
            Subscribed
          </Button>
        ) : (
          <Button
            onClick={() => {
              const prevUser = currentSelectedUser;
              const userUpdate = {
                ...prevUser,
                subscribedPosts: [...prevUser.subscribedPosts, tempPost.id],
              };
              setCurrentSelectedUser(userUpdate);
              setCurrentUsers([
                ...allCurrentUsers.filter((u) => u.id !== userUpdate.id),
                userUpdate,
              ]);
            }}
            startIcon={<Add />}
          >
            Subscribe
          </Button>
        ),
      ].filter((val) => !!val)}
      status={() => {
        return (
          <Typography>
            {[tempPost.postedByEmail, renderDate(tempPost.createdAt)]
              .filter((val) => !!val)
              .join(' - ')}
          </Typography>
        );
      }}
      getContent={() => (
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6}>
            <CardMedia
              component="img"
              alt={tempPost.title + '-' + tempPost.id}
              className={classes.media}
              src={
                tempPost.content?.pictureAddress
                  ? tempPost.content.pictureAddress
                  : 'https://winaero.com/blog/wp-content/uploads/2020/09/windows-xp-bliss-wallpaper-icon.jpg'
              }
              title={tempPost.title}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {tempPost.content.body}
              </Typography>
            </CardContent>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="body1" color="textSecondary">
              {'Tags: ' + tempPost.tags.map((tag) => tag.tagKeyword).join(', ')}
            </Typography>
          </Grid>
        </Grid>
      )}
    />
  );
  const currentDate = new Date();

  return (
    <>
      {!currentSelectedUser ? (
        <Typography variant="h4">
          Session timed out. Please log back in...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {/* <div>{JSON.stringify(currentSelectedUser, null, 2)}</div> */}
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <BrsCardContent>
                <Formik<Search>
                  initialValues={searchSchema.cast({})}
                  onSubmit={onSubmit}
                  validationSchema={searchSchema}
                  enableReinitialize={true}
                >
                  <Form>
                    <SearchFields />
                  </Form>
                </Formik>
              </BrsCardContent>
            </Card>
          </Grid>
          {!!currentPagination?.length &&
            currentPagination.map((tempPost, index) => (
              <Grid item xs={12} md={12} lg={12}>
                {differenceInDays(tempPost.createdAt, currentDate) <= 1 ? (
                  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    color="error"
                    badgeContent={' '}
                  >
                    <PostCard tempPost={tempPost} />
                  </Badge>
                ) : (
                  <PostCard tempPost={tempPost} />
                )}
              </Grid>
            ))}
        </Grid>
      )}
      <Box>
        <Grid container spacing={0} justify={'center'}>
          <Grid item xs={1}>
            <Tooltip title={'Prev Page'}>
              <Button
                disabled={currentPage === 0}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
                startIcon={<ChevronLeftIcon />}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Typography>{currentPage}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title={'Next Page'}>
              <Button
                disabled={currentPage * 5 + 5 >= currentUserPosts.length}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
                startIcon={<ChevronRight />}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
