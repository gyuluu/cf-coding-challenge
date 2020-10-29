import React, {useState, useEffect} from 'react';
import './App.scss';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showCourse, setShowCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [nextDates, setNextDates] = useState([]);
  const [correctPrice, setCorrectPrice] = useState([]);
  const secret = require('./secrets.json');

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
    setSelectedCourseTitle(e.target.textContent);
    const filteredCourse = courses.filter(course => course.title === e.target.textContent);
    fetch(`https://private-e05942-courses22.apiary-mock.com/courses/${filteredCourse[0].slug}`)
      .then(response => response.json())
      .then(json => {
        console.log('this is your selected course: ', json);
        setSelectedCourse(json);
        setStartDate(json.start_dates[0]);
        setNextDates(json.start_dates.slice(1));
        const prices = json.prices;

        fetch(`http://api.ipstack.com/check?access_key=${secret.key}`)
          .then(response => response.json())
          .then(json => {
            console.log('this is the current user: ', json);
            if (json.continent_code === 'EU') {
              const price_eu = prices.filter(price => price.currency === 'eur');
              setCorrectPrice(price_eu);
            } else {
              const price_usd = prices.filter(price => price.currency === 'usd');
              setCorrectPrice(price_usd);
            }
          })
          .catch(err => console.log(err));
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
            <h2>{selectedCourseTitle}</h2>
            <p className='course-description'>{selectedCourse.description}</p>
            <p><span className='course-date'>Next Start Date: </span>{startDate}</p>
            <p><span className='course-date'>Next Dates: </span></p>
            {
              nextDates.map((date, index) => 
                <p key={index}>{date}</p>
              )
            }
            <p>
              <span className='price'>Price: </span>
              {
                correctPrice.map((price, index) => 
                  <span key={index}>{price.amount} {price.currency}</span>
                )
              }
            </p>
          </div>
        ) : (
          null
        )
      } 
    </div>
  );
}

export default App;
