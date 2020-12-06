const keyMirror = require('fbjs/lib/keyMirror');
import generatorAction from '../generatorAction';

const user = generatorAction(['FETCH_USER', 'FETCH_USER_LIST', 'CREATE_USER']);
const role = generatorAction(['FETCH_ROLE_LIST', 'CREATE_ROLE']);
const permission = generatorAction(['FETCH_PERMISSION_LIST', 'CREATE_PERMISSION']);
const userRole = generatorAction(['FETCH_USER_ROLE_LIST']);

const actions = Object.assign({}, user, role, permission, userRole);

export default keyMirror(actions);