const keyMirror = require('fbjs/lib/keyMirror');
import generatorAction from '../generatorAction';

const user = generatorAction(['FETCH_USER', 'FETCH_USER_LIST', 'CREATE_USER']);
const role = generatorAction(['FETCH_ROLE_LIST', 'CREATE_ROLE']);

const actions = Object.assign({}, user, role);

export default keyMirror(actions);