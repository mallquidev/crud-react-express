import axios from 'axios'

export const createTaskRequest = async (task) =>
    axios.post('http://localhost:3000/tasks', task)