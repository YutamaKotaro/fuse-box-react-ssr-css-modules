import {
  UP_COUNTER,
  DOWN_COUNTER,
} from '../actions/counter';

const initialState = {
  count: 0,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case UP_COUNTER:
      return {
        ...state,
        count: state.count + 1,
      };
    case DOWN_COUNTER:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
