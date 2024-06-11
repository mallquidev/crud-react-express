import { Formik, Form } from 'formik'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTasks } from '../context/TaskContext'

function TasksForm() {
  const { createTask, getTask, updateTask } = useTasks()
  const [task, setTask] = useState({
    title: "",
    description: "",
    })
    
    const params = useParams()
    const navigate = useNavigate()

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        console.log('loading data')
        const task = await getTask(params.id)

        setTask({
          title: task.title,
          description: task.description
        })
      }
    }
    loadTask()
  }, [])

  return (
    <div>
      <h1>{params.id ? 'Edit Task' : 'Create Task'}</h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values)
          if(params.id) {
            console.log('Update')
            await updateTask(params.id, values)
            navigate('/')
          } else {
            await createTask(values)
          }
          setTask({
            title: "",
            description: ""
          })
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>title</label>
            <input type="text" placeholder='title' name='title' onChange={handleChange} value={values.title} />
            <label>description</label>
            <input type="text" placeholder='description' name='description' onChange={handleChange} value={values.description} />
            <button type='submit' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TasksForm
