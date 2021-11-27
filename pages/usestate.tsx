import React, { useState, useEffect } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const num = count<5?+1:-5;
  const [fruit, setFruit] = useState('banana');
  const switchFruit = fruit==='banana'?'pisang':'banana';
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  let newArr = [...todos]; // copying the old datas array
  const [index, setIndex]= useState(0);
  newArr[index] = {text:"asdfajlkjsdf"}; // 
  useEffect(() => {
    document.title = `You clicked ${count} times`; // https://reactjs.org/docs/hooks-effect.html
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + num)}>
        click setCount
      </button>
      <p>{fruit}</p>
      <button onClick={() => setFruit(switchFruit)}>
        click set fruit
      </button>
      <p>{index}</p>
      <button onClick={() => {
        setIndex(index + 1)
        setTodos(newArr)}
      
      }>
        click set todo 
      </button>
      <div>{
        todos.map(({text})=>(
          <li>{text}</li>
        ) )
        }

      </div>
    </div>
  );
}

export default Example;

// Hooks are JavaScript functions, but they impose two additional rules:

// Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
// Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. 
// (There is just one other valid place to call Hooks — your own custom Hooks. We’ll learn about them in a moment.)
// We provide a linter plugin to enforce these rules automatically. We understand these rules might seem 
// limiting or confusing at first, but they are essential to making Hooks work well.