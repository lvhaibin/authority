import { put, call, take, fork, takeLatest } from 'redux-saga/effects';
import { userInfo, userList, userAdd } from '../../request/user';
import ActionTypes from '../actions/types';
import { message } from 'antd';
import {
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserListRequest,
  fetchUserListSuccess,
  fetchUserListFailure,
} from '@actions/user';


function* handleFetchUserRequest(params) {
  try {
    const res = yield call(userInfo, params);
    yield put(
        fetchUserSuccess({
        data: res
      })
    );
  } catch (e) {
    yield put(fetchUserFailure(e));
  }
}

function* handleFetchUserListRequest(params) {
  try {
    const res = yield call(userList, params.page, params.size);
    yield put(
      fetchUserListSuccess({
        data: res
      })
    );
  } catch (e) {
    yield put(fetchUserListFailure(e));
  }
}

function* handleCreateUserRequest(params) {
  try {
    yield call(userAdd, params.payload);
    yield put(
      fetchUserListRequest({
        page: 1,
        size: 10
      })
    );
    message.success({
      content: '创建成功'
    });
  } catch (error) {
    message.error({
      content: error.msg || '创建失败'
    });
  }
}


export function* watchFetchUser() {
    while (true) {
      const resData = yield take(ActionTypes.FETCH_USER_REQUEST);
      yield fork(handleFetchUserRequest, resData.payload);
    }
}

export function* watchFetchUserList() {
  while (true) {
    const resData = yield take(ActionTypes.FETCH_USER_LIST_REQUEST);
    yield fork(handleFetchUserListRequest, resData.payload);
  }
}

export function* watchCreateUser() {
  yield takeLatest(ActionTypes.CREATE_USER_REQUEST, handleCreateUserRequest);
    // yield fork(handleCreateUserRequest, resData.payload);
}
  
