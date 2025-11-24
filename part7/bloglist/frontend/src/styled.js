import styled from 'styled-components';
import {

  Link,

} from "react-router-dom"

export const Page = styled.div`

    font-family: "Cherry Bomb One", system-ui;
    font-weight: 400;
    font-style: normal;
    padding: 0.25em 1em;
    background: #ffdedeff;
    border: 10px solid #ff8484ff;
    border-radius: 1em;
    color: #f97d7dff;
`
//rödaktiga
//  color: #ff8484ff;


export const Button = styled.button`
    font-family: "Cherry Bomb One", system-ui;
    font-weight: 400;
    font-style: normal;
    background: Bisque;
    margin: 0.5em;
    padding: 0.2em 0.7em;
    border: 2px solid #ff8484ff;
    border-radius: 3px;
    color: #f97d7dff;
    font-size:  1em;
     &:hover {
    background: #ff8484ff;
    color: white; 
  }

`

export const SmallTitle = styled.h1`
    font-size:  2em

`

export const Title = styled.h1`
    font-size:  3em

`

export const Input = styled.input`
  background: Pink;
  margin: 0.25em;
  border: 3px solid #ff8484ff;
  border-radius: 0.5em;
   font-family: "Cherry Bomb One", system-ui;
    font-weight: 400;
    font-style: normal;
    color: #f97d7dff;
  `



export const Navigation = styled.div`

  padding: 0.5em;
  background: #ffc8c8ff;
  border: 10px solid #ff8484ff;
  border-radius: 1em;
      font-size:  2em;
    

`

/*  &:hover ${Button} {
    display: none;
  }*/
export const List = styled.div`
  background: #ffc8c8ff;
  padding: 1em;
  margin: 1em;
  border: 10px solid #ff8484ff;
  border-radius: 1em;
    color: #ff8484ff;

`
// dd8b8bff
//brun aktiga

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
    &:hover {
    color: white; 
  }
`;

export const Box = styled.div`
  background: Bisque;
  padding: 0.5em;
  border: 5px solid #ff8484ff;
  margin: 0.25em;
  border-radius: 1em;
    &:hover {
    background: #ff8484ff;
    color: white; 
  }
`
/*

export const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`
 */