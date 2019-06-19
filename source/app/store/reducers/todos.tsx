
import { ADD_TODO, REMOVE_TODO } from '../actions'
import {TODO} from '../models'

export default function todos(state: TODO[] = [], action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        { text: action.text },
      ]
    case REMOVE_TODO:
      const s =  state.filter((todo: TODO, index) => {
        if (index !== action.index) { return true }
      })
      return s
    default:
      return state
  }
}
