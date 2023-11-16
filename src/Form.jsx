import React from 'react'

//receving the props from App.js /parent file and using where we need

function Form({ input, setInput, input2, setInput2, addTodo }) {
  return (
    <>
      <div className='row justify-content-center mt-4'>
        <div className='col-lg-4'>
          <input type="text" className='form-control' placeholder="TodoName" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className='col-lg-4 '>
          <input type="text" className="form-control" placeholder="TodoDescription" value={input2} onChange={(e) => setInput2(e.target.value)} />
        </div>
      </div>
      <div className='row justify-content-center text-center mt-4'>
        <button className='btn btn-success col-2 add-btn' onClick={addTodo}>
          Add Todo
        </button>
      </div>
    </>
  );
}




export default Form;




