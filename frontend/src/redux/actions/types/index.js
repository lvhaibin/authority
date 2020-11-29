const keyMirror = require('fbjs/lib/keyMirror');
import generatorAction from '../generatorAction';

const user = generatorAction(['FETCH_USER', 'FETCH_USER_LIST', 'CREATE_USER']);

const actions = Object.assign({}, user);

export default keyMirror(actions);