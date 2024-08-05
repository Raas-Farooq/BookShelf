import booksModel from "../models/model.js";

const API_KEY = 'AIzaSyB6zftUyD0XGtYpWlTfAXzPccvoYvdM1Vc';
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';



async function fetchBooks() {
    console.log("fetch books iis walking")
  const query = 'subject:fiction'; // You can change this to get different types of books
  const maxResults = 40;
  const url = `${BASE_URL}?q=${query}&maxResults=${maxResults}&key=${API_KEY}`;
  
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      // Process the data here
      return data;
    })
    .catch(error => console.error('Error:', error));
}




export default fetchBooks;