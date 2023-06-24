import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

export type addTodolistACType =  ReturnType<typeof addTodolistAC>
export type removeTodolistACType =  ReturnType<typeof removeTodolistAC>

type ActionsType = removeTodolistACType
    | addTodolistACType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>


export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            const todoListChangeTitle = state.find(todolist => todolist.id === action.todoListId)
            if (todoListChangeTitle) {
                todoListChangeTitle.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const todoListChangeFilter = state.find(todolist => todolist.id === action.todolistId)
            if (todoListChangeFilter) {
                todoListChangeFilter.filter = action.filerValue
            }
            return [...state]
        default:
            throw new Error("new Error")
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", todolistId} as const
}

export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()} as const
}

export const changeTodolistTitleAC = (todoListId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, title} as const
}

export const changeTodolistFilterAC = (filerValue: FilterType, todolistId: string) => {
    return {type: 'CHANGE-TODOLIST-FILTER', filerValue, todolistId} as const
}

