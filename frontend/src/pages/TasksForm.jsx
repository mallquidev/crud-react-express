import {Formik, Form} from 'formik'
import {createTaskRequest} from '../api/tasks.api'

function TasksForm() {
  return (
    <div>
      <Formik
        initialValues={{
            title: "",
            description: ""
        }}
        onSubmit={async(values, actions)=>{
            console.log(values)
            try {
                const response = await createTaskRequest(values)
                console.log(response)
                actions.resetForm()
            } catch (error) {
                console.error(error)
            }
        }}
      >
        {({handleChange, handleSubmit, values, isSubmitting})=>(
            <Form onSubmit={handleSubmit}>
            <label>title</label>
            <input type="text" placeholder='title' name='title' onChange={handleChange} value={values.title}/>
            <label>description</label>
            <input type="text" placeholder='description' name='description' onChange={handleChange} value={values.description}/>
            <button type='submit' disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default TasksForm
