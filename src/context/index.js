import React, { createContext, useState, useEffect } from 'react'
import { useTodos, useProjects, useFilterTodos, useProjectsWithStats } from '../hooks'
import firebase from '../firebase';
const TodoContext = createContext()

function TodoContextProvider({children}){
    const defaultProject = 'today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = useState(undefined);
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user =>{
            setCurrentUser(user);
        })
    }, [])

    const todos = useTodos()
    const projects = useProjects()
    const projectsWithStats = useProjectsWithStats(projects, todos)
    const filteredTodos = useFilterTodos(todos, selectedProject)

    return (
        <TodoContext.Provider
            value={
                {
                    defaultProject,
                    selectedProject,
                    setSelectedProject,
                    currentUser,
                    todos : filteredTodos,
                    projects : projectsWithStats,
                    selectedTodo,
                    setSelectedTodo,
                }
            }
        >
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContextProvider, TodoContext }