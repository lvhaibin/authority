const keyMirror = require('fbjs/lib/keyMirror');

const user =  {
    FETCH_USER_REQUEST: null,
    FETCH_USER_SUCCESS: null,
    FETCH_USER_FAILURE: null
}

const actions = Object.assign({}, user);

export default keyMirror(actions);