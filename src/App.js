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
        // 2. In the code below we are passing handleUpdateToDo into <ToDoItem/> as a props since the <ToDoItem/> is inside the <ToDoListContainer/> and we originally passed handleUpdateTodo directly into <ToDoListContainer/>
        return <ToDoItem toDoItem={toDoItem} handleUpdateToDo={props.handleUpdateToDo} className="To-do-item" />
      })}
    </div>
  )
}


const ToDoItem = (props) => {
  console.log(props.toDoItem.completedDate);
  return (
    <div>
      <h2>{props.toDoItem.title}</h2>
      <p>Priority: {props.toDoItem.priority}</p>
      <p>Creation Date: {props.toDoItem.creationDate}</p>
      {/* line below says if completedDate is there then(&&) show it to the user */}
      {props.toDoItem.completedDate && <p> Completed Date: {props.toDoItem.completedDate}</p>}
      <p>Description: {props.toDoItem.description}</p>
      {/* 3. In the code below we are passing handleUpdateToDo into button as a props with the required parameters that we need to check for (toDoItem.title and toDoItem.createdDate) */}
      <button onClick={() => { props.handleUpdateToDo(props.toDoItem.title, props.toDoItem.createdDate) }} >Toggle Complete</button>
    </div>
  )
}



const ToDoForm = (props) => {
  // only 3 properties that need user input which is why they are the only ones we are using here
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  // only 3 properties that need user input which is why they are the only ones we are using here


  return (
    <div>
      <label>Title </label>
      {/* on change set the title to be w.e gets input here by the user */}
      <input type="text" onChange={(e) => { setTitle(e.target.value) }} />
      <br />

      <label>Priority </label>
      {/* on change set the priority to be w.e gets input here by the user */}
      <select onChange={(e) => { setPriority(e.target.value) }}>
        {/* below the user will have three options to choose from to update the priority with */}
        <option value="">--Please choose an option--</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <br />

      <label>Description </label>
      {/* <textarea></textarea> is used for large text values. Allows the user to resize the area as needed by clicking and dragging on the bottom right of the box. */}
      {/* on change set the description to be w.e gets input here by the user */}
      <textarea onChange={(e) => {
        setDescription(e.target.value)
      }}></textarea>
      <br />


      {/* // props here is allowing us to invoke handleAddTodo from another scope because its not global and the only way we can invoke it in here is by props. Here we are passing our three parameters that are subject to change based on user input */}
      <button onClick={() => {
        props.handleAddTodo(title, priority, description)
      }}>Add ToDo</button>
    </div >
  )
}


/* **************************************************************************

******************************* COMPONENTS END ******************************

************************************************************************** */





const App = () => {
  // the code bwlow is declaring the data thats going to be initially be passed around
  const [toDoList, setToDoList] = useState([{
    title: "Implement ToDo List",
    priority: "High",
    isComplete: false,
    description: "Implement the todo list application",
    creationDate: new Date().toString(),
    completedDate: null
  }])





  // function below is taking the three properties that have been changed by the user and creating a new ToDo object, spreading toDoList (because thats where all of our objects are currently living) and inserting our new object into it
  const handleAddTodo = (title, priority, description) => {
    let newToDo = {
      title: title,
      priority: priority,
      isComplete: false,
      description: description,
      creationDate: new Date().toString(),
      completedDate: null,
    }
    // line below we are SPREADING (...(or opening)) the current toDoList so we can insert the new object into it, in this case it being newToDo
    const toDoListCopy = [...toDoList, newToDo]

    // line belows calls the most currently updated to-do list with the new object pushed into it after being spread on line 126
    setToDoList(toDoListCopy)
  }







  // function below is handling the toggle switch that allows the user to determine if a tod item has been completed or not
  const handleUpdateToDo = (title, createdDate) => {
    const toDoListCopy = [...toDoList]

    let listCopy = toDoListCopy.map((todo) => {
      // Code below says if the todo.title matches the inputed title by the user and the createdDate matches the createdDate inputed by the user
      if (todo.title === title && todo.createdDate === createdDate) {
        // if both parameters match and todo.isComplete is false then set it to true and update the completedDate to new Date()
        if (todo.isComplete === false) {
          todo.isComplete = true
          todo.completedDate = new Date().toString()
          // if nothing matches then do whats inside the brackets
        } else {
          todo.isComplete = false
          todo.completedDate = null
        }

        return todo

      } else {
        return todo
      }
    })
    console.log("List Copy: ")
    console.log(listCopy)
    // When the code belo runs, the ToDoList gets updated with the parameters we passed through listCopy (so the validations that allow us to toggle)
    setToDoList(listCopy)
  }





  // JSX BELOW
  return (
    <div className="App-header">
      <h1>Todo List</h1>
      {/* line 157 is where our data handling process begins */}
      {/* code below is passing toDoList (the array of one object from above) as a prop into the TodoListContainer component */}
      <ToDoForm handleAddTodo={handleAddTodo} />
      {/* 1. below we are passing handleUpdateToDo={handleUpdateToDo} into <ToDoListContainer/> because thats where we have access to <ToDoItem/> */}
      <ToDoListContainer toDoList={toDoList} handleUpdateToDo={handleUpdateToDo} />
    </div>
  );
}

export default App;
