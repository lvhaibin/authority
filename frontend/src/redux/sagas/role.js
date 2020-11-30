import { put, call, take, fork, takeLatest } from 'redux-saga/effects';
import { roleList, roleAdd } from '@request/role';
import ActionTypes from '@actions/types';
import { message } from 'antd';
import {
  fetchRoleListRequest,
  fetchRoleListSuccess,
  fetchRoleListFailure,
} from '@actions/role';


function* handleFetchRoleListRequest(params) {
  try {
    const res = yield call(roleList, params.page, params.size);
    yield put(
      fetchRoleListSuccess({
        data: res.data
      })
    );
  } catch (e) {
    yield put(fetchRoleListFailure(e));
  }
}

function* handleCreateRoleRequest(params) {
  try {
    yield call(roleAdd, params.payload);
    yield put(
      fetchRoleListRequest({
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

export function* watchFetchRoleList() {
  while (true) {
    const resData = yield take(ActionTypes.FETCH_ROLE_LIST_REQUEST);
    yield fork(handleFetchRoleListRequest, resData.payload);
  }
}

export function* watchCreateRole() {
  yield takeLatest(ActionTypes.CREATE_ROLE_REQUEST, handleCreateRoleRequest);
}
  
