import { Link } from "react-router-dom"
import {styled} from 'styled-components'
const NavHeader = styled.div`
display:flex;
justify-content:space-between;

`
const LogoParent = styled.div`
margin-left:20px;
`
const LinksContainer = styled.div`
margin-top:1.3em;
margin-right:20px;
`

const Motto = styled.h2`
color:orange;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;

  button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #45a049;
    }
  }
`;


const Navbar = () => {


    return (
        <NavHeader>
            <LogoParent>
                <Motto> BoOk STore </Motto>
            </LogoParent>
            <LinksContainer>
                <StyledLink to="/favorites" ><button>My Favorites</button></StyledLink>
                <StyledLink to="/"><button>HOME</button></StyledLink>
            </LinksContainer>
            
        </NavHeader>
    )
}

export default Navbar