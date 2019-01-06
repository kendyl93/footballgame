import { socket } from '../index';
import { actionTypes } from '../actions/actionsTypes';

const reducer = (
  state = {
    pot: 0,
    snackbarIsOpen: false,
    name: null,
    names: [],
    mode: null,
    whoDidIt: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.PITCH_IN:
      state = { ...state, pot: ++state.pot, mode: 'pitch' };
      socket && socket.emit('UPDATE_POT', state);
      break;
    case actionTypes.GET_ONE:
      state = { ...state, pot: --state.pot, mode: 'get' };
      socket && socket.emit('UPDATE_POT', state);
      break;
    case actionTypes.DELIVER_UPDATED_POT_TO_REDUCER:
      state = { ...state, pot: action.updatedPot.pot };
      break;
    case actionTypes.CURRENT_POT_TO_REDUCER:
      state = { ...state, pot: action.pot };
      break;
    case actionTypes.ASSIGNED_USERNAME:
      state = { ...state, name: action.name };
      break;
    case actionTypes.PUT_ALL_NAMES_TO_REDUCER:
      state = { ...state, names: action.names };
      break;
    case actionTypes.PICTHED_IN:
      state = {
        ...state,
        snackbarIsOpen: true,
        mode: 'pitch',
        whoDidIt: action.name
      };
      break;
    case actionTypes.GOT_ONE:
      state = {
        ...state,
        snackbarIsOpen: true,
        mode: 'get',
        whoDidIt: action.name
      };
      break;
    case actionTypes.ANOTHER_ONE_PITCHED_IN:
      state = { ...state, snackbarIsOpen: false };
      break;
    default:
      break;
  }

  return state;
};

export default reducer;
