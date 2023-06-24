import React, {useState} from 'react';
import './App.css';
import {TasksType, TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "What to buy", filter: 'all'},
        {id: todoListId2, title: "What to learn", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Angular", isDone: true},
            {id: v1(), title: "Vue", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Angular", isDone: true},
            {id: v1(), title: "Vue", isDone: false}
        ]

    })


    const removeTask = (id: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title, isDone: false}
        let todolistTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, newIsDone: boolean, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(task => task.id === id)
        if (task) {
            task.isDone = newIsDone
            setTasks({...tasks})
        }

    }

    const changeFilter = (filerValue: FilterType, TDId: string) => {
        const todolist = todoLists.find(todoList => todoList.id === TDId)
        if (todolist) {
            todolist.filter = filerValue
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (TDId: string) => {
        setTodoLists(todoLists.filter(todoList => todoList.id !== TDId))
        delete tasks[TDId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    const changeTaskTitle = (todoListId: string, title: string, taskId: string) => {
        const allTasks = tasks[todoListId]
        const task = allTasks.find(task => task.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    const changeTodoListTitle = (todoListId: string, title: string) => {
        const todoList = todoLists.find(todolist => todolist.id === todoListId)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(todolist => {

                        let todoListTasks = tasks[todolist.id]
                        let filteredTasks = todoListTasks

                        if (todolist.filter == "active") {
                            filteredTasks = todoListTasks.filter(task => !task.isDone)
                        }
                        if (todolist.filter == "completed") {
                            filteredTasks = todoListTasks.filter(task => task.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <TodoList
                                    key={todolist.id}
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={filteredTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={todolist.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
