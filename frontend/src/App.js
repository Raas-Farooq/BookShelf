import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
// import { response } from 'express';

function App() {


  useEffect(() => {
    makeRequest();
  },[])

  const makeRequest = () => {
    
    console.log("Im going to makerequest");

    fetch('http://localhost:3005/bookish/api/effortTest').then(
      response => response.json()
    ).then
    (data => {
      console.log("this is YOUR Effort :", data);
    }).catch(err => console.log("error Caught: ",err ))
  }


    const handleAddBook = () => {

      const newBook = {
        myId:',eur343',
        title:'Strength and Weaknesses',
        authors:['Raas '],
        publisher:'Khanum & Co',
        imageLink:'http://books.google.com/books/content?id=5c8Scnnvi84C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'

      }

      if(!newBook.myId.trim()){
        console.log("Title Shouldn't be Empty");
        return;
      }

      if(!(Array.isArray(newBook.authors)) || newBook.authors.lenght=== 0){
        console.log("Array is Empty. plz Enter the Array");
        return;
      }

    const year = parseInt(newBook.year);
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      console.error("Invalid year");
      return;
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
    

    const handleEditBook = () => {
      const newId = '49qqmAEACAAJ';
      console.log("edit handle run");
      const data = {
        updatedTitle:'Be Patient on Your Achievements ',
        updatedAuthors:['Raas', 'Rohina'],
        newYear: "2015"
      }

      if (!data.updatedTitle.trim()) {
        console.error("Title cannot be empty");
        return;
      }
    
      if (!Array.isArray(data.updatedAuthors) || data.updatedAuthors.length === 0) {
        console.error("Authors must be a non-empty array");
        return;
      }
      
      const year = parseInt(data.newYear);
      if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
        console.error("Invalid year");
        return;
      }

      fetch(`http://localhost:3005/bookish/api/editBook/${newId}`, {
        method:'PUT',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)

      }).then(response => response.json()).
      then(data => {
        if(data.success){
          console.log("Success: ", data);
        }else{
          console.log('error message: ',data.message)
        }
        
      })
      .catch(err => console.log("err: ", err))
    }

    function handleDelete(){
      const id = '66b071892ab1d551ae9b011c';

      if(!id || (typeof(id) !== "string")){
        console.log("ID Shouldn't Empty or must be String");
        return;
      }

      fetch(`http://localhost:3005/bookish/api/deleteBook?id=${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(response => response.json())
      .then(data => {
        if(data.success){
          console.log("data response on Delete Route ", data);
        }
        else{
          console.log("Error message: ", data)
        }
        
      }).catch(err => console.log("this is the Err while deleting the Book:", err))
    }

  return (
    <div className="App">
      <h2> Books Our Life</h2>

      <button onClick={(e) => makeRequest(e) } > BakcendRequest</button>
      <button onClick={handleAddBook}> Privilege</button>
      <button onClick={handleEditBook}> Edit</button>
      <button onClick={handleDelete}> delete</button>
    </div>
  );
}

export default App;
