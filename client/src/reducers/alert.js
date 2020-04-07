import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case SET_ALERT:
      return [...state, payload]; // add new alert to initialState
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload); // payload in this case in just id
                                                         // payload can be what ever we whant    
    default:
      return state;  // every reducer have default state 
  }
}
