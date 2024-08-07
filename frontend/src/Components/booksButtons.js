import { Link } from "react-router-dom";
import styled from "styled-components";

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

const BtnsContainer = styled.div`
width:100%;
display:flex;
justify-content:center;
gap:20px;`


export default function BookButtons(props){

    
    const id = props.book.myId;
    const handleDelete = () => {
        if(!id || (typeof(id) !== "string")){
            console.log("ID Shouldn't Empty or must be String");
            return;
          }
        props.onDeleteClick(id);
    }
    
    return(
        <BtnsContainer>
            <Link to={`/editing/${id}`} > <SuperButton> Edit </SuperButton> </Link>
            <SuperButton onClick={handleDelete}> Delete </SuperButton> 
        </BtnsContainer>
    )
}