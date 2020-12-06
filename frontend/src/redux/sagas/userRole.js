import { put, call, take, fork } from 'redux-saga/effects';
import { userRoleList } from '@request/userRole';
import ActionTypes from '@actions/types';
import {
  fetchUserRoleListSuccess,
  fetchUserRoleListFailure,
} from '@actions/userRole';


function* handleFetchUserRoleListRequest(params) {
  try {
    const res = yield call(userRoleList, params.page, params.size);
    yield put(
      fetchUserRoleListSuccess({
        data: res.data
      })
    );
  } catch (e) {
    yield put(fetchUserRoleListFailure(e));
  }
}

export function* watchFetchUserRoleList() {
  while (true) {
    const resData = yield take(ActionTypes.FETCH_USER_ROLE_LIST_REQUEST);
    yield fork(handleFetchUserRoleListRequest, resData.payload);
  }
}

