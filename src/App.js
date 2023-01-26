import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const 
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Food Shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    }
  ])

  // Add Task
  const addTask = (task) => {
    // create a random id for the new task
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = {id: id, ...task}
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    // this is passing to setTasks the above tasks array but
    // filtering the 'deleted' task from the tasks array
    // each time when the setTasks is called with the filtered
    // array, the Tasks and Task components get updated.
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    // copies the entire tasks array but inverts the value for
    // reminder of the selected task and passes the new array
    // to setTasks which updates the appearance of the selected
    // task.
    setTasks(tasks.map((task) =>
      task.id === id ? {
        ...task, reminder:
          !task.reminder
      } : task)
    )
  }

  return (
    // using the ternary operator is display a message if
    // there are no tasks left
    <div className="container">
      <Header />
      <AddTask onAdd={addTask} />
      {tasks.length > 0 ?
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
        :
        'All tasks completed!'
      }
    </div>
  );
}

export default App