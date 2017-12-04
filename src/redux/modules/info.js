const LOAD = 'fuse-react-ssr/info/LOAD';
const LOAD_SUCCESS = 'fuse-react-ssr/info/LOAD_SUCCESS';
const LOAD_FAIL = 'fuse-react-ssr/info/LOAD_FAIL';

const initialState = {
  loaded: false,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function isLoaded (globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => Promise.resolve(client),
  };
}
