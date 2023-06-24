import {TasksType} from "../TodoList";
import {FilterType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | addTodolistACType
    | removeTodolistACType

export const tasksReducer = (state: TasksType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            const TasksOfTodolistForRemove = state[action.todolistId]
            state[action.todolistId] = TasksOfTodolistForRemove.filter(task => task.id !== action.taskId)
            return {...state}
        case "ADD-TASK":
            const TasksOfTodolistForAdd = state[action.todolistId]
            const taskForAdd = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: {taskForAdd, ...TasksOfTodolistForAdd}}
        case "CHANGE-TASK-STATUS":
            const TasksOfTodolistChangeStatus = state[action.todolistId]
            const taskChangeStatus = TasksOfTodolistChangeStatus.find(task => task.id === action.taskId)
            if (taskChangeStatus) {
                taskChangeStatus.isDone = action.newIsDone
            }
            return {...state}
        case "CHANGE-TASK-TITLE":
            const TasksOfTodolistChangeTitle = state[action.todoListId]
            const taskChangeTitle = TasksOfTodolistChangeTitle.find(task => task.id === action.taskId)
            if (taskChangeTitle) {
                taskChangeTitle.title = action.title
            }
            return {...state}
        case "ADD-TODOLIST":
            let stateCopyAdd = {...state}
            stateCopyAdd[action.todolistId] = []
            return stateCopyAdd
        case "REMOVE-TODOLIST":
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            throw new Error("new Error")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}

export const changeTaskTitleAC = (todoListId: string, title: string, taskId: string) => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, title, taskId} as const
}

export const changeTaskStatusAC = (newIsDone: boolean, todolistId: string, taskId: string) => {
    return {type: 'CHANGE-TASK-STATUS', newIsDone, todolistId, taskId} as const
}

