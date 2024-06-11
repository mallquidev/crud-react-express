import {useTasks} from '../context/TaskContext'
import {useNavigate} from 'react-router-dom'

function TaskCard({ task }) {
    const {deleteTask} = useTasks()
    const navigate = useNavigate()
    
    const handleDone = (taskDone) => {
        console.log(taskDone)
    }

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <span>{task.done === 1 ? "✔️" : "❌"}</span>
            <span>{task.createAt}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
            <button onClick={()=> handleDone(task.done)}>Done</button>
        </div>
    )
}

export default TaskCard
