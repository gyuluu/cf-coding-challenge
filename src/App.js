import React, {useState, useEffect} from 'react';
import './App.scss';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("https://private-e05942-courses22.apiary-mock.com/courses")
      .then(response => response.json())
      .then(json => {
        console.log('these are your courses: ', json);
        setCourses(json);
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
                {
                  courses.map((course, index) => 
                    <a href='#' key={index}> {course.title} </a>
                  )
                }
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
