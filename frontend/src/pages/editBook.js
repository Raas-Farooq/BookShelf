import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";


const ComponentContainer = styled.div`
position:relative;`


const SuperButton = styled.button`
padding:8px 12px;
background-color:#4CAF50;
color:white;
border-radius:2em;
cursor:pointer;
font-size:14px;

&:hover{
background-color:#45a049;
}
`

const BookForm = styled.form`
display:flex;
flex-direction:column;
gap:10px;`

const LinkStyle = styled(Link)`
text-decoration:none;
position:absolute;
right:30px;
`

const FormContainer = styled.div`
display:flex;
justify-content:center;
text-align:center;
`

const TitleMessage = styled.span`
color:red;
font-size:13px
`
const AuthorsMessage = styled.span`
color:red;
font-size:13px
`
const ImageMessage = styled.span`
color:red;
font-size:13px
`

export default function EditBook(){

    const {id} = useParams();
    // console.log("id: ", id);
    const [newTitle, setNewTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [newLink, setNewLink] = useState('');

    const [titleMessage, setTitleMessage] = useState('');
    const [authorsMessage, setAuthorsMessage] = useState('');
    const [imageMessage, setImageMessage] = useState('');

    const myTitleRef = useRef(null);

    useEffect(() => {
        

        setTimeout(() => {
            if(myTitleRef.current){
                myTitleRef.current.focus();
            }
        }, 100)
    }, []);


    const handleTitle = (e) => {
        const title = e.target.value;
        setNewTitle(title);
    }

    const handleAuthors = (e) => {
        
        const newAuthors = e.target.value;
        setAuthors(newAuthors);
       
    }

    const handleImageLink = (e) => {
        
        const imageLink = e.target.value;
        console.log('imageLink', imageLink);
        setNewLink(imageLink);
        
    }

    function handleSubmit(e){
        e.preventDefault();
        
    
        if(!newTitle || typeof(newTitle) !== 'string'){
            console.log("title is empty: or Not string");
            setTitleMessage("title might be empty: or Not string")
            return;
        }else{
            setTitleMessage('')
        }

        if(!authors || typeof(authors) !== 'string'){
            console.log("authors is empty: or Not string");
            setAuthorsMessage("authors might be empty: or Not string")
            return;
        }else{
            setAuthorsMessage('');
            
        }
        

        // if(!newLink || typeof(newLink) !== 'string'){
        //     console.log("ImageLink might be empty: or Not string");
        //     setImageMessage("ImageLink might be empty: or Not string")
        //     return;
        // }else{
        //     setImageMessage('')
        // }

        const editData = {
            updatedTitle: newTitle,
            updatedAuthors:authors
        }

        fetch(`http://localhost:3005/bookish/api/editBook/${id}`,
            {
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(editData)
            }
        ).then(response => response.json()).
        then(data => {
            if(data.success){
                console.log("Edit Response", data);
                setNewLink('');
                setNewTitle('')
                setAuthors('')
            }
            else{
                console.log("Error ", data.message)
            }
        })
        
        
    } 

    
    return (
        <ComponentContainer>
            <LinkStyle to="/"> <SuperButton>Back To HOME</SuperButton> </LinkStyle> 
            <h2> Enter the New Details </h2>
            <FormContainer>
                <BookForm onSubmit={handleSubmit}>
                    <label> Title</label>

                    <input type="text"
                     ref={myTitleRef} 
                     onChange={(e) => handleTitle(e)} 
                     placeholder="Enter the Title"
                     value={newTitle} 
                     name="title" 
                     />
                    <TitleMessage> {titleMessage} </TitleMessage>

                    <label> Authors </label>
                    <input type="text" 
                    placeholder="Authors Name separated by comma" 
                    name="title" 
                    onChange ={(e) => handleAuthors(e)}
                    value={authors} 
                    />
                    <AuthorsMessage> {authorsMessage} </AuthorsMessage>

                    <label> Image </label>
                    <input type="text" 
                    placeholder="Enter the Image Link" 
                    name="title" 
                    onChange={(e) => handleImageLink(e)} 
                    />
                    {/* <ImageMessage> {imageMessage} </ImageMessage> */}


                    <SuperButton onClick={handleSubmit}> Edit </SuperButton>
                </BookForm>

            </FormContainer>
        </ComponentContainer>
    )
}