
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

export default {
  addTodo(text: string) {
    return { type: ADD_TODO, text }
  },

  removeTodo(index: number) {
    return { type: REMOVE_TODO, index }
  },
}
