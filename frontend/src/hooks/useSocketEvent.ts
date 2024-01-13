import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/modules/user/selectors';
import * as socketModule from '../services/socket';

type IPostEventPayload = any;

export default function useSocketEvent() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onPostEvent = (payload: IPostEventPayload) => {
    console.log('Post Event: ', payload);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const socket = socketModule.getSocket();
      socket.on('postEvent', onPostEvent);
    }
  }, [isAuthenticated]);

  return {};
}
