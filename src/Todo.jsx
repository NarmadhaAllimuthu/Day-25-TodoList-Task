
import React, { useState, useEffect } from 'react';

//receving the props from App.js /parent file and using where we need

function Todo({ todos, setTodos, deleteTodo, editTodo, handleStatusChange }) {

 //usestate used for update or chang states of the needs by users
  
  const [statusFilterDropdownOpen, setStatusFilterDropdownOpen] = useState(false);
  const [individualTodoDropdownOpen, setIndividualTodoDropdownOpen] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);



  useEffect(() => {
    // Load todos from local storage on component mount and checking 
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [setTodos]);  

  useEffect(() => {
    // Save todos to local storage whenever it changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    // Update the filtered todos whenever the status filter changes
    if (statusFilter === 'All') {
      setFilteredTodos([...todos]);
    } else {
      const filteredTodo = todos.filter((todo) => todo.status === statusFilter);
      setFilteredTodos(filteredTodo);
    }
  }, [todos, statusFilter]);

//used to handle dropdown is need to show or hide

  const handleStatusFilterDropdownToggle = () => {
    setStatusFilterDropdownOpen(!statusFilterDropdownOpen);        //update the state variable here based on true or false
  };

//handle the status of individual dropdown

  const handleIndividualTodoDropdownToggle = (index) => {
    setIndividualTodoDropdownOpen(index === individualTodoDropdownOpen ? null : index);
  };

  const handleFilterOptionClick = (selectStatus) => {
    // Update the status filter state when a menu item is clicked
    setStatusFilter(selectStatus);
    // Close the dropdown menu
    setStatusFilterDropdownOpen(false);
  };

  return (
    <>
      <div className='row justify-content-center'>
        <div className='col-4 mt-4'>
          <h3  className='head'>My Todos</h3>
        </div>
        <div className='col-4 mt-4 '>
          <h3 className='head'>Status Filter :
            <div className="btn-group">
              <button
                className="btn btn btn-danger btn-md dropdown-toggle "
                type="button"
                data-bs-toggle="dropdown"
                onClick={handleStatusFilterDropdownToggle}
              >
                {statusFilter}
              </button>
              <ul className={`dropdown-menu ${statusFilterDropdownOpen ? 'show' : ''}`}>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleFilterOptionClick('All')}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleFilterOptionClick('Complete')}
                  >
                    Complete
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => handleFilterOptionClick('Not Complete')}
                  >
                    Not Complete
                  </a>
                </li>
              </ul>
            </div>
          </h3>
        </div>
      </div>

      {filteredTodos && filteredTodos.length > 0 ? (
        <div className='row'>
               {filteredTodos.map((arr) => (
 
              <div key={arr.id} className='col-4'>
                <ul className=' todo-list'>
                <li>
                  <h4>Name:<span className='text'> {arr.name}</span></h4>
                </li>
                <li> <h4> Description: <span className='text'>{arr.description}</span></h4></li>
                <li> <h4>
                  Status:
                  <span className='text' >
                  <div className="btn-group">
                    <button
                      className="btn btn-warning btn-md dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      style={{ backgroundColor: arr.color }} 
                      onClick={() => handleIndividualTodoDropdownToggle(arr.name)}
                    >
                      {arr.status}
                    </button>
                    <ul className={`dropdown-menu ${arr.name === individualTodoDropdownOpen ? 'show' : ''}`} onClick={() => setIndividualTodoDropdownOpen(null)}>
                      <li>
                        <a
                          className="dropdown-item"
                         
                          onClick={() => {
                            handleStatusChange(arr.id, 'Complete');
                            setIndividualTodoDropdownOpen(null);
                            
                          }} 
                        >
                          Complete
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            handleStatusChange(arr.id, 'Not Complete');
                            setIndividualTodoDropdownOpen(null);
                          }}
                        >
                          Not Complete
                        </a>
                      </li>
                    </ul>
                  </div>
                  </span>
                  </h4>
                </li>
                <div className=' optional '>
                <button className="btn btn-md btn-danger delete" onClick={() => deleteTodo(arr.id)}>
                  Delete
                </button>
                <button
                  className="btn btn-danger btn-md  edit"
                  onClick={() => {
                    editTodo(arr.id)
                  }}
                >
                  Edit
                </button>
              </div>
              </ul>
              </div>
            ))}
         
        </div>
      ) : (
        <div className='text-center'>
          <input type='text' placeholder='Create Your Task List' className='form-cotrol' disabled/>
          {/* <h6>Create Your Task List</h6> */}
        </div>
      )}
    </>
  );
}

export default Todo;


















