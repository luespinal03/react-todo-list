import { useState } from "react";
import './App.css';
// import CompApp from './components/CompApp.js'



/* **************************************************************************

******************************* COMPONENTS START ****************************

************************************************************************** */

// here we are recieving whats being passed through the return() inside the App component. We console.log props to see our array that contains one object. We console.log props.toDoList to Specifically see our one object inside the array we are working with
const ToDoListContainer = (props) => {
  console.log(props);
  console.log(props.toDoList);
  return (
    <div>
      {props.toDoList.map((toDoItem, index) => {
        return <ToDoItem toDoItem={toDoItem} />
      })}
    </div>
  )
}


const ToDoItem = (props) => {
  console.log(props.toDoItem);
  return (
    <div>
      <h2>{props.toDoItem.title}</h2>
      <p>Priority: {props.toDoItem.priority}</p>
      <p>Creation Date: {props.toDoItem.creationDate}</p>
      <p>Completed Date: {props.toDoItem.isComplete}</p>
      {/* if completedDate is not null then(&&) show it to the user */}
      {props.toDoItem.completedDate !== null && <p>{props.toDoItem.completedDate}</p>}
      <p>Description: {props.toDoItem.description}</p>
    </div>
  )
}



const ToDoForm = () => {
  // only 3 properties that need user input which is why they are the only ones we are using here
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <label>Title </label>
      <input type="text" onChange={(e) => { setTitle(e.target.value) }} />
      <br />

      <label>Priority </label>
      <select onChange={(e) => { setPriority(e.target.value) }}>
        <option value="">--Please choose an option--</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <br />

      <label>Description </label>
      {/* <textarea></textarea> is used for large text values. Allows the user to resize the area as needed by clicking and dragging on the bottom right of the box. */}
      <textarea onChange={(e) => {
        setDescription(e.target.value)
      }}></textarea>
      <br />



    </div>
  )
}


/* **************************************************************************

******************************* COMPONENTS END ******************************

************************************************************************** */





const App = () => {
  // the code bwlow is declaring the data thats going to be initially be passed around
  const [toDoList, useToDoList] = useState([{
    title: "Implement ToDo List",
    priority: "High",
    isComplete: false,
    description: "Implement the todo list application",
    creationDate: new Date().toString(),
    completedDate: null
  }])

  // JSX BELOW
  return (
    <div className="App-header">
      <h1>Todo List</h1>
      {/* code below is passing toDoList (the array of one object from above) as a prop into the TodoListContainer component */}
      <ToDoForm />
      <ToDoListContainer toDoList={toDoList} />
    </div>
  );
}

export default App;
