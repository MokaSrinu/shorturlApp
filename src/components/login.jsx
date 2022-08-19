import styled from "styled-components";
import react from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import {useSelector,useDispatch} from "react-redux";
import { setAuth } from "../redux/Auth/action";


const Logindiv=styled.div`
width:30%;
margin:auto;
display:flex;
flex-direction:column;
margin-top:50px;
padding:30px;
border-radius:16px;
box-shadow:rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;


export const Login=()=>{
    const [email,setEmail]=react.useState();
    const [password,setPassword]=react.useState();
    const navigate=useNavigate();
    //const {Auth}=useSelector((state)=>state.ndata);
    const dispatch=useDispatch();

    
    const loginhandler=()=>{
        if(email && password){
          //console.log(email,password);
          const logindata={
                "email":email,
                "password":password 
          } 
          //console.log(registerdata)
          fetch("https://afternoon-dusk-89621.herokuapp.com/users/login",{
            method:"POST",
            body:JSON.stringify(logindata),
            headers:{
                "Content-Type":"application/json"
            }
          })
          .then((res)=>res.json())
          .then((res)=>{
            //console.log(res)
            const {data}=res;
            //console.log(data.token);
            localStorage.setItem("token",JSON.stringify(data.token));
            alert("login success");
            dispatch(setAuth(true));
            navigate("/")
          });
          
        }else{
            alert("enter all the fields")
        }
    }

    return(
        <Logindiv>
            <h2 style={{color:"gold"}}>Login Form</h2>
            <input style={{height:"30px",marginBottom:"10px"}} type="email" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input style={{height:"30px",marginBottom:"10px"}} type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button style={{height:"34px",marginBottom:"10px",background:"blue",color:"white",border:"none",borderRadius:"8px"}} onClick={()=>loginhandler()} >Login</button>
            <p>not registered yet?<Link to="/register">Register</Link></p>
        </Logindiv>
    )
}