import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  // if not using the mock json server we would
  // put the tasks array here instead of the
  // empty array
  const [tasks, setTasks] = useState([])

  // Called when the page loads
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // fetch tasks array from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // fetch a task of given id from the server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    // get newly created task
    const data = await res.json()
    // add it to the ui
    setTasks([...tasks, data])

    // w/o using json server
    // create a random id for the new task
    // const id = Math.floor(Math.random() * 1000) + 1
    // const newTask = { id: id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    // remove task from the json server
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    // Remove task from the ui:
    // this is passing to setTasks the above tasks array but
    // filtering the 'deleted' task from the tasks array
    // each time when the setTasks is called with the filtered
    // array, the Tasks and Task components get updated.
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    // copies the entire tasks array but inverts the value for
    // reminder of the selected task and passes the new array
    // to setTasks which updates the appearance of the selected
    // task.
    // while using the json server the inversion
    // of reminder is happening by making the
    // following PUT request

    // toggle reminder of the task on the json server
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    // change appearnce of the task
    setTasks(tasks.map((task) =>
      task.id === id ? {
        ...task, reminder: data.reminder
      } : task)
    )
  }

  return (
    // using the ternary operator to display
    // a message if there are no tasks left

    // using a shorthand ternary operator to
    // show or hide the AddTask form
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Routes>
          <Route
            path='/'
            exact
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder} />
                ) : (
                  'All tasks completed!'
                )}
              </>
            }
          />
          <Route
            path='/about'
            element={
              <About />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App