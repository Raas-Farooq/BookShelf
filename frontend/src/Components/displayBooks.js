import { useEffect } from "react";
import styled from "styled-components"
import BookButtons from "./booksButtons";

const BooksContainer=styled.div`
display:flex;
flex-wrap:wrap;
gap:20px;
`
const MyImage = styled.img`
 width:auto;
 height: 180px;`

const BookCard=styled.div`
text-align:center;
box-shadow:0 2px 5px;
width:300px;
height:350px;

`
const DisplayBooks = ({book, onDeleting}) => {

    const {myId, title, authors, publisher, imageLink} = book;

    let cutTitle = title.trim().split(' ').slice(0,3).join(' ');
    if(title.split(' ').length > 2){
        cutTitle += '..'
    }
    

    return(
        
        <BookCard key={myId}>
            <h2> {cutTitle} </h2>
            <MyImage src={imageLink} alt={title} />
            <p> {authors && authors.length>1 ? authors.join(' , ') : authors} </p> 
            <BookButtons book={book} onDeleteClick={onDeleting} />
        </BookCard>
        
    )
}

export default DisplayBooks