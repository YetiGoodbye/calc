import React from 'react';

function App(props){
  const children = {};
  props.children.forEach((el) => {
    children[el.key] = el;
  });

	return (
    <div>
    {children.warning}
    {children.info}
    </div>
  );
}

export default App;
