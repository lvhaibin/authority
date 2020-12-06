import { createActions } from 'redux-actions';
import ActionTypes from './types';

export const { fetchUserRoleListRequest, fetchUserRoleListSuccess, fetchUserRoleListFailure } = createActions(
  ActionTypes.FETCH_USER_ROLE_LIST_REQUEST,
  ActionTypes.FETCH_USER_ROLE_LIST_SUCCESS,
  ActionTypes.FETCH_USER_ROLE_LIST_FAILURE
);

