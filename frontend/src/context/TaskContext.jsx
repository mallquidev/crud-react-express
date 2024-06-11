import { createContext, useContext, useState } from 'react'
import { getTasksRequest, deleteTaskRequest, createTaskRequest, getTaskRequest, updateTaskRequest } from '../api/tasks.api'

export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error("useTasks must be used within a TaskContextProiver")
    }
    return context
}

export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])
    async function loadTask() {
        const response = await getTasksRequest()
        setTasks(response.data)
    }

    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id)
            setTasks(tasks.filter(task => task.id !== id))
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) => {
        try {
            const response = await createTaskRequest(task)
            console.log(response)

        } catch (error) {
            console.error(error)
        }
    }

    const getTask = async (id) => {
        try {
            const response = await getTaskRequest(id)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const updateTask = async (id, newFields) => {
        try {
            const response = await updateTaskRequest(id, newFields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, loadTask, deleteTask, createTask, getTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}