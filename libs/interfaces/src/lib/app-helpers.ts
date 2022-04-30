import { compareDesc } from 'date-fns';
import { User, Post, Search } from './app-interfaces';
export class AppHelpers {
  static filterPostForUserHome(currentUser: User, allPosts: Post[]) {
    return currentUser
      ? allPosts.filter(
          (post) =>
            post.postedById === currentUser.id ||
            currentUser.subscribedPosts.includes(post.id)
        )
      : [];
  }

  static filterAndSortPostsForUserExplore(currentUser: User, allPosts: Post[]) {
    const userTags = currentUser.tags.map((t) => t.tagKeyword) || [];
    const includeTags = allPosts
      .filter((post) =>
        post.tags.reduce((prevVal, currentTag) => {
          if (userTags.includes(currentTag.tagKeyword)) {
            return true;
          }
          return prevVal;
        }, false)
      )
      .sort((a, b) => compareDesc(a.createdAt, b.createdAt));
    const includeTagIds = includeTags.map((p) => p.id);
    const notIncludeTags = allPosts
      .filter((po) => !includeTagIds.includes(po.id))
      .sort((a, b) => compareDesc(a.createdAt, b.createdAt));

    return [...includeTags, ...notIncludeTags];
  }
  static searchPosts(search: Search, allPosts: Post[], currentUser: User) {
    const searchKeywords = search.search.split(' ').map((s) => s.toLowerCase());
    const postKeywords = allPosts.map((p) => ({
      id: p.id,
      keywords: [
        p.postedByEmail,
        ...p.title.split(' '),
        ...p.tags.map((t) => t.tagKeyword),
      ].map((s) => s.toLowerCase()),
    }));
    const matchedPostIds = postKeywords.reduce(
      (prevValue: number[], currentVal) => {
        const searchResult = searchKeywords.reduce((isInSearch, current) => {
          const regex = new RegExp(current);
          const result = currentVal.keywords.map(
            (keyword) => !!keyword.match(regex)?.length
          );
          if (result.includes(true)) {
            return true;
          }
          return isInSearch;
        }, false);
        if (searchResult) {
          return [...prevValue, currentVal.id];
        }
        return prevValue;
      },
      []
    );
    const matchedPosts = allPosts.filter((post) =>
      matchedPostIds.includes(post.id)
    );
    return this.filterAndSortPostsForUserExplore(currentUser, matchedPosts);
  }
}
