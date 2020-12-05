import { put, call, take, fork, takeLatest } from 'redux-saga/effects';
import { permissionList, permissionAdd } from '@request/permission';
import ActionTypes from '@actions/types';
import { message } from 'antd';
import {
  fetchPermissionListRequest,
  fetchPermissionListSuccess,
  fetchPermissionListFailure,
} from '@actions/permission';


function* handleFetchPermissionListRequest(params) {
  try {
    const res = yield call(permissionList, params.page, params.size);
    yield put(
      fetchPermissionListSuccess({
        data: res.data
      })
    );
  } catch (e) {
    yield put(fetchPermissionListFailure(e));
  }
}

function* handleCreatePermissionRequest(params) {
  try {
    yield call(permissionAdd, params.payload);
    yield put(
      fetchPermissionListRequest({
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

export function* watchFetchPermissionList() {
  while (true) {
    const resData = yield take(ActionTypes.FETCH_PERMISSION_LIST_REQUEST);
    yield fork(handleFetchPermissionListRequest, resData.payload);
  }
}

export function* watchCreatePermission() {
  yield takeLatest(ActionTypes.CREATE_PERMISSION_REQUEST, handleCreatePermissionRequest);
}
  
