import { fork, all } from 'redux-saga/effects';
import { watchFetchUser } from './user';

export default function* rootSaga() {
    try {
      yield all([
        fork(watchFetchUser),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  