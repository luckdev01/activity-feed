import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILoginData } from '@/redux/modules/user/types';
import { userActionCreators } from '../../redux/modules/user/actions';
import {
  selectIsAuthenticated,
  selectLogin,
} from '../../redux/modules/user/selectors';
import LoginForm from './LoginForm';

export default function LoginContainer() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectLogin);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (values: ILoginData) => {
      dispatch(userActionCreators.loginUser(values));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/activity-feeds');
    }
  }, [isAuthenticated, navigate]);

  return <LoginForm handleLogin={handleLogin} loading={isLoading} />;
}
