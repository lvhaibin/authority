import { createActions } from 'redux-actions';
import ActionTypes from './types';

export const { fetchRoleListRequest, fetchRoleListSuccess, fetchRoleListFailure } = createActions(
  ActionTypes.FETCH_ROLE_LIST_REQUEST,
  ActionTypes.FETCH_ROLE_LIST_SUCCESS,
  ActionTypes.FETCH_ROLE_LIST_FAILURE
);

export const { createRoleRequest, createRoleSuccess, createRoleFailure } = createActions(
  ActionTypes.CREATE_ROLE_REQUEST,
  ActionTypes.CREATE_ROLE_SUCCESS,
  ActionTypes.CREATE_ROLE_FAILURE
);
