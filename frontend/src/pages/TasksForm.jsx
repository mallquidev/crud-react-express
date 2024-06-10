import {Formik, Form} from 'formik'

function TasksForm() {
  return (
    <div>
      <Formik
        initialValues={{
            title: "",
            description: ""
        }}
        onSubmit={(values)=>{
            console.log(values)
        }}
      >
        {({handleChange, handleSubmit})=>(
            <Form onSubmit={handleSubmit}>
            <label>title</label>
            <input type="text" placeholder='title' name='title' onChange={handleChange} />
            <label>description</label>
            <input type="text" placeholder='description' name='description' onChange={handleChange}/>
            <button type='submit'>Save</button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export default TasksForm
