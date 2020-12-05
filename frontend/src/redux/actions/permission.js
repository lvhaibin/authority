import { createActions } from 'redux-actions';
import ActionTypes from './types';

export const { fetchPermissionListRequest, fetchPermissionListSuccess, fetchPermissionListFailure } = createActions(
  ActionTypes.FETCH_PERMISSION_LIST_REQUEST,
  ActionTypes.FETCH_PERMISSION_LIST_SUCCESS,
  ActionTypes.FETCH_PERMISSION_LIST_FAILURE
);

export const { createPermissionRequest, createPermissionSuccess, createPermissionFailure } = createActions(
  ActionTypes.CREATE_PERMISSION_REQUEST,
  ActionTypes.CREATE_PERMISSION_SUCCESS,
  ActionTypes.CREATE_PERMISSION_FAILURE
);
