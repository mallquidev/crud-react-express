import { useEffect, useState } from 'react'
import {getTasksRequest} from '../api/tasks.api'

function TasksPage() {
  
  const [tasks, setTasks] = useState([])

  useEffect(()=> {
    async function loadTask() {
      const response = await getTasksRequest()
      setTasks(response.data)
    }
    loadTask()
  }, [])

  return (
    <div>
      <h1>List</h1>
      {
        tasks.map(task => (
          <div key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <span>{task.done === 1 ? "✔️": "❌"}</span>
            <span>{task.createAt}</span>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default TasksPage
