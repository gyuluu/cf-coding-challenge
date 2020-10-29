import React, {useEffect} from 'react';
import './App.scss';

function App() {

  useEffect(() => {
    fetch("https://private-e05942-courses22.apiary-mock.com/courses")
      .then(response => response.json())
      .then(json => {
        console.log('these are your courses: ', json);
      })
      .catch(err => console.log('this is your error: ', err));
  }, []);

  return (
    <div className="App">
      <h1>CareerFoundry</h1>
      <p>
        Choose one course we have to offer
      </p>
    </div>
  );
}

export default App;
