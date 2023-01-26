import { useState } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks';

const App = () => {
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

  // Delete Task
  const deleteTask = (id) => {
    // this is passing to setTasks the above tasks array but
    // filtering the 'deleted' task from the tasks array
    // each time when the setTasks is called with the filtered
    // array, the Tasks and Task components get updated.
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    // using the ternary operator is display a message if 
    // there are no tasks left
    <div className="container">
      <Header />
      { tasks.length > 0 ?
        <Tasks tasks={tasks} onDelete={deleteTask} />
        :
        'All tasks completed!'
      }
    </div>
  );
}

export default App;