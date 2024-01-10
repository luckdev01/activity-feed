export type IPost = {
  username: string;
  profileImage: string;
  postContent: string;
  likeCount: number;
  timeStamp: string;
};

export type IPostDTO = {
  name: string;
  type: string;
  userId: string;
  eventTime: string;
};

export type PostState = {
  isLoading: boolean;
  posts: IPost[];
  error: any;
};
