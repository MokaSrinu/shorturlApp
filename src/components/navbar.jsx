import  { useEffect } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { setAuth,setUser } from "../redux/Auth/action";

const NavbarWrapper=styled.div`
display:flex;
align-items:center;
justify-content:space-around;
gap:20px;
background:blue;
color:white;
padding:20px;
`;

const StyledLink=styled(Link)`
  color:white;
  cursor:pointer;
  padding:10px;
`;


export const Navbar=()=>{
    const {Auth,User}=useSelector((state)=>state.ndata);
    const dispatch=useDispatch();
    //console.log(Auth);
    //const [Auth,setAuth]=react.useState(false);
    const checkAuth=()=>{
        let token=localStorage.getItem("token");
        if(token){ 
                dispatch(setAuth(true));
                fetch("https://afternoon-dusk-89621.herokuapp.com/users/getLoggedIn",{
                 method:"GET",
                 headers:{
                  "Content-Type":"application/json",
                  "token":JSON.parse(token)
                 }
                })
                .then((res)=>res.json())
                .then((res)=>{
                 //console.log("srinu checking",res)
                 const {data}=res;
                 //console.log(data);
                 dispatch(setUser(data));
                 //navigate("/")
                });
        }else{
                dispatch(setAuth(false))
        }
    }
    useEffect(()=>{
       checkAuth();
    },[Auth])
    
    const removetoken=()=>{
        //setAuth(false);
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <NavbarWrapper>
            <div><h2>URL Shortner App</h2></div>
            <div style={{float:"right"}}>
            <StyledLink to="/">Home</StyledLink>
            {
                Auth ? <span style={{cursor:"pointer",background:"white",color:"black"}} >{User.name}&nbsp;<span style={{cursor:"pointer",color:"white",background:"blue"}} onClick={()=>removetoken()}>&nbsp;&nbsp;LogOut</span></span> :<StyledLink to="/login">Login</StyledLink>
            }
            </div>
            
        </NavbarWrapper>
    )
}