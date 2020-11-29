import { createActions } from 'redux-actions';
import ActionTypes from './types';

export const { fetchUserRequest, fetchUserSuccess, fetchUserFailure } = createActions(
  ActionTypes.FETCH_USER_REQUEST,
  ActionTypes.FETCH_USER_SUCCESS,
  ActionTypes.FETCH_USER_FAILURE
);

export const { fetchUserListRequest, fetchUserListSuccess, fetchUserListFailure } = createActions(
  ActionTypes.FETCH_USER_LIST_REQUEST,
  ActionTypes.FETCH_USER_LIST_SUCCESS,
  ActionTypes.FETCH_USER_LIST_FAILURE
);

export const { createUserRequest, createUserSuccess, createUserFailure } = createActions(
  ActionTypes.CREATE_USER_REQUEST,
  ActionTypes.CREATE_USER_SUCCESS,
  ActionTypes.CREATE_USER_FAILURE
);
