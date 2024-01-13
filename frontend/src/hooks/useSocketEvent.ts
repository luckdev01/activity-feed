import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPost } from '@/redux/modules/posts/types';
import { selectIsAuthenticated } from '../redux/modules/user/selectors';
import { postActionCreators } from '../redux/modules/posts/actions';
import store from '../redux/store';
import * as socketModule from '../services/socket';

type IPostEventPayload = IPost;

export default function useSocketEvent() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onPostEvent = (payload: IPostEventPayload) => {
    console.log('Post Event: ', payload);
    const user = store.getState().user.user.data;

    // if other user posted it
    if (user?.id !== payload.userId) {
      store.dispatch(postActionCreators.addNewFeed(payload.id));
    }
  };

  useEffect(() => {
    // Register post event after login
    if (isAuthenticated) {
      const socket = socketModule.getSocket();
      socket.on('postEvent', onPostEvent);
    }
  }, [isAuthenticated]);

  return null;
}
