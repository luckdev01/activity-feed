import { fork, all } from 'redux-saga/effects';

import { postSaga } from '../modules/posts/saga';
import { userSaga } from '../modules/user/saga';

export default function* rootSaga(store: any): IterableIterator<any> {
  yield all([fork(postSaga), fork(userSaga)]);
}
