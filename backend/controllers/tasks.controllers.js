import {pool} from '../db.js'

export const getTasks = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tasks')
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}
export const getTask = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id])
        if(result.length === 0) 
            return res.status(400).json({message: "Task not found"})
        res.json(result[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}
export const createTasks = async(req, res) => {
    try {
        const {title, description} = req.body
        if(!title || !description) {
            return res.status(400).json({message: "only title and description are allowed"})
        }
        const [result] = await pool.query('INSERT INTO tasks(title, description) VALUES(?,?)', [title, description])
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const updateTasks = async(req, res) => {
    try {
        const [result] = await pool.query('UPDATE tasks SET ? WHERE id = ?', [req.body, req.params.id])
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const deleteTasks = async(req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
        if(result.affectedRows === 0)
            return res.sendStatus(404)

        return res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}