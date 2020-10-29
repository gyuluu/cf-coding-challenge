import React, {useState, useEffect} from 'react';
import './App.scss';

function App() {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch("https://private-e05942-courses22.apiary-mock.com/courses")
      .then(response => response.json())
      .then(json => {
        console.log('these are your courses: ', json);
      })
      .catch(err => console.log('this is your error: ', err));
  }, []);

  const displayMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  }

  return (
    <div className='app'>
      <div className='navigation'>
        <h1 className="cf-logo">CareerFoundry</h1>
        <div className='dropdown'>
          <button className="dropbtn" onClick={displayMenu}>Courses ↓</button>
          {
            showMenu ? (
              <div className='menu'>
                <a href='#'> Course 1 </a>
                <a href='#'> Course 2 </a>
                <a href='#'> Course 3 </a>
              </div>
            ) : (
              null
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
