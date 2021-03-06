import { fork, all } from 'redux-saga/effects';
import { watchFetchUser, watchFetchUserList, watchCreateUser } from './user';
import { watchFetchRoleList, watchCreateRole } from './role';
import { watchFetchPermissionList, watchCreatePermission } from './permission';
import { watchFetchUserRoleList } from './userRole';

export default function* rootSaga() {
    try {
      yield all([
        fork(watchFetchUser),
        fork(watchFetchUserList),
        fork(watchCreateUser),
        fork(watchFetchRoleList),
        fork(watchCreateRole),
        fork(watchFetchPermissionList),
        fork(watchCreatePermission),
        fork(watchFetchUserRoleList),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  