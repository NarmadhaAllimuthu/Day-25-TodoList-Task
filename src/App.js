

import "./App.css"
import React, { useState, useEffect } from 'react';
import Form from './Form';
import Todo from './Todo';


function App() {
  //usestate used for update or chang states of the needs by users
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [todos, setTodos] = useState([]);
  const [color, setcolor] = useState("");

//handling addtodo button here

  const addTodo = () => {
    if (input !== '' && input2 !== '') {                            //checking name and description is filled or empty only work if it is filled
      const existingTodo = todos.find((item) => item.name === input);   //find the item is already existing and store it in existingTodo for update

      if (existingTodo) {                                              //existingTodo is true execute below code
        const updatedTodos = todos.map((item) =>
          item.name === input ? { ...item,name:input, description: input2, status: existingTodo.status } : item
        );                                                             //updating the todo it is existing or modification
        setTodos(updatedTodos); 
      } else {                                                       //if it is not existing then create newTodo
        const newTodo = {
          id: new Date().getTime(),
          name: input,
          description: input2,
          status: 'Not Complete',
        };
        setTodos([...todos, newTodo]);
      }
//after creting then clear that from input box
      setInput('');                     
      setInput2('');
    }
  };

  
//edit  btn is handled here by passing id 

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);           //here we are checking/filtering which btn is clicked in array of object id and get details
   if (todoToEdit) {                                                 //if it is true
      setInput(todoToEdit.name);                                      //update the edited name
      setInput2(todoToEdit.description);                              //update the edited description
    } 
  };

//delete  btn is handled here by passing id 

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);     //here we are checking/filtering which btn is notclicked 
    setTodos(newTodos);                                         //updating the new array of objects that filtered above
  };  

  //handlestatuschange while changing status here it is handled by passing id and setnewstatus
  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus, color: newStatus === 'Complete' ? 'green' : 'orange' } : todo
    );                                 //checking by id which todo list  is going to set newstatus and setcolor checking based on complete or not-complete strings 
    setTodos(updatedTodos);             //update the todo array of objects here after changing status and color
  };

// handling status filter that used to filter the neeeded
  const handleFilter = (selectedStatus) => {
    if (selectedStatus === "All") {
      //  set to Show all todos
      setTodos([...todos]);
    } else {
      // Filter todos based on the selected status
      const filteredTodos = todos.filter((todo) => todo.status === selectedStatus);
      setTodos([...filteredTodos]);
    }
  };

  return (
    <div className="container ">
      <div className="text-center heading">
        <h1>My Todo</h1>
      </div>
      {/* passing props to the component fies */}
      <Form input={input} setInput={setInput} input2={input2} setInput2={setInput2}
        addTodo={addTodo} />

      <Todo todos={todos} setTodos={setTodos}
        deleteTodo={deleteTodo} editTodo={editTodo} handleStatusChange={handleStatusChange} handleFilter={handleFilter} />


    </div>
  );
}

export default App;

















