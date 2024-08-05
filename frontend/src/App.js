import logo from './logo.svg';
import './App.css';

function App() {

  const makeRequest = (e) => {
    e.preventDefault();
    console.log("Im going to makerequest");

    fetch('http://localhost:3005/bookish/api/effortTest').then(
      response => response.json()
    ).then
    (data => {
      console.log("this is YOUR Effort :", data)
    }).catch(err => console.log("error Caught: ",err ))
  }

    const handleAddBook = () => {

      const newBook = {
        myId:'3sldkfoeu3',
        title:'Awaken Giant',
        Authors:['Anthony Robbins'],
        year:'1990',
        publisher:'Books & Books'

      }

      fetch('http://localhost:3005/bookish/api/addBook', {
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(newBook)
      }).
      then(response => response.json()).
      then(data => {
        console.log("Secret : ", data)
      }).catch(err => console.log("err while fetching privilege", err))
    }

  return (
    <div className="App">
      <h2> Books Our Life</h2>

      <button onClick={(e) => makeRequest(e) } > BakcendRequest</button>
      <button onClick={handleAddBook}> Privilege</button>
    </div>
  );
}

export default App;
