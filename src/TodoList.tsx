import React, {ChangeEvent, FC, useState} from "react";
import App, {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskType[]
}


type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (filerValue: FilterType, TDId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, newIsDone: boolean, todoListId: string) => void
    filter: FilterType
    removeTodoList: (TDId: string) => void
    changeTaskTitle: (todoListId: string, title: string, taskId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}
export const TodoList: FC<PropsType> = (props) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    const allHandler = () => {
        props.changeFilter("all", props.id)
    }
    const activeHandler = () => {
        props.changeFilter("active", props.id)
    }
    const completedHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    return (

        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {props.tasks.map(task => {

                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, title, task.id)
                    }

                    const removeTask = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
                    }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <Checkbox color='primary' checked={task.isDone} onChange={changeTaskStatus}/>
                        <EditableSpan value={task.title} onChange={changeTaskTitle}/>
                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <div>
                <Button variant={props.filter === "all" ? 'outlined' : 'text'}
                        onClick={allHandler}
                        color='inherit'>All</Button>
                <Button variant={props.filter === "active" ? 'outlined' : 'text'}
                        onClick={activeHandler} color='primary'>Active
                </Button>
                <Button variant={props.filter === "completed" ? 'outlined' : 'text'}
                        onClick={completedHandler}
                        color='secondary'
                >Completed
                </Button>
            </div>
        </div>
    )

}