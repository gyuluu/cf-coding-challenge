import React, {useState, useEffect} from 'react';
import './App.scss';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [startDate, setStartDate] = useState('');
  const [nextDates, setNextDates] = useState([]);

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

  const selectCourse = (e) => {
    console.log("this is your course: ", e.target.textContent);
    const filteredCourse = courses.filter(course => course.title === e.target.textContent);
    fetch(`https://private-e05942-courses22.apiary-mock.com/courses/${filteredCourse[0].slug}`)
      .then(response => response.json())
      .then(json => {
        console.log('this is your selected course: ', json);
        setSelectedCourse(json);
        setStartDate(json.start_dates[0]);
        setNextDates(json.start_dates.slice(1));
      })
      .catch(err => console.log(err));
    setShowCourse(true);
    setShowMenu(false);
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
                    <span key={index} onClick={selectCourse}>{course.title}</span>
                  )
                }
              </div>
            ) : (
              null
            )
          }
        </div>
      </div>
      {
        showCourse ? (
          <div>
            <p className='course-description'>{selectedCourse.description}</p>
            <p><span className='course-date'>Next Start Date: </span>{startDate}</p>
            <p><span className='course-date'>Next Dates: </span></p>
            {
              nextDates.map((date, index) => 
                <p key={index}>{date}</p>
              )
            }
          </div>
        ) : (
          null
        )
      } 
    </div>
  );
}

export default App;
