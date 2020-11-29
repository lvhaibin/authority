import { fork, all } from 'redux-saga/effects';
import { watchFetchUser, watchFetchUserList, watchCreateUser } from './user';

export default function* rootSaga() {
    try {
      yield all([
        fork(watchFetchUser),
        fork(watchFetchUserList),
        fork(watchCreateUser),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  