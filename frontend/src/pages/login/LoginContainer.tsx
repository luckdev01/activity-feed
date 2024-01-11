import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { ILoginData } from '@/redux/modules/user/types';
import { userActionCreators } from '../../redux/modules/user/actions';
import { selectIsLoading } from '../../redux/modules/user/selectors';
import LoginForm from './LoginForm';

export default function LoginContainer() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleLogin = useCallback(
    (values: ILoginData) => {
      dispatch(userActionCreators.loginUser(values));
    },
    [dispatch],
  );

  return <LoginForm handleLogin={handleLogin} loading={isLoading} />;
}
