import react, { useEffect } from "react";
import "./home.css";
import {useNavigate,Redirect} from "react-router-dom";
import { useSelector } from "react-redux";



export const Home=()=>{
    const [fullurl,setFullurl]=react.useState('');
    const [shorturl,setShorturl]=react.useState('');
    const [allurls,setAllurls]=react.useState('');
    const navigate=useNavigate();
    const {Auth}=useSelector((state)=>state.ndata);
    
    if(!localStorage.getItem('token')){
        navigate('/login')
    }
    useEffect(()=>{
        getAllUrls();
    },[shorturl])

    const getAllUrls=()=>{
        fetch("https://afternoon-dusk-89621.herokuapp.com/getallurls")
      .then((res)=>res.json())
      .then((res)=>{
        const {data}=res
        console.log(data)
        setAllurls(data);
      });
    }
    
    const handleshorturl=()=>{
      console.log(fullurl);
      const urldata={
        "fullurl":fullurl
      }
      fetch("https://afternoon-dusk-89621.herokuapp.com/shortUrls",{
        method:"POST",
        body:JSON.stringify(urldata),
        headers:{
            "Content-Type":"application/json"
        }
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res)
        setShorturl(res.short);
      });
    }
    const handleclick=(e)=>{
        console.log('hi')
        console.log("check",e)
        const data={
            short:shorturl
        }
        fetch("https://afternoon-dusk-89621.herokuapp.com/getfullbyshort",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
      })
      .then((res)=>res.json())
      .then((res)=>{
        //console.log(res)
        window.location.href=res.full
        e.target.href=res.full;
      });
    }

    const handleclick1=(shorturl)=>{
        const data={
            short:shorturl
        }
        fetch("https://afternoon-dusk-89621.herokuapp.com/getfullbyshort",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
      })
      .then((res)=>res.json())
      .then((res)=>{
        //console.log(res)
        window.location.href=res.full
      });
    }
    console.log("check",allurls)
    if(allurls){
        return(
            <div className="mainbody">
                <div className="uppercontainer">
                   <div className="urlbox">
                    <br />
                    <br />
                     <h2><span style={{color:"blue"}}>Our</span>&nbsp;URL Shortner</h2>
                     <input type="text" value={fullurl} onChange={(e)=>setFullurl(e.target.value)} placeholder="Enter Url to be shortend..." />
                     <button onClick={handleshorturl}>Get Short Url</button>
                     <p><a href="#" onClick={(e)=>handleclick(e)}>{shorturl}</a></p>
                   </div>
                </div>
                <div className="lowercontainer">
                  <div className="tablebox">
                    <table>
                        <thead style={{background:"blue",color:"white"}}>
                         <tr>
                            <th>Full URL</th>
                            <th>Short Link</th>
                            <th>Clicks</th>
                         </tr>
                        </thead>
                        <tbody>
                             {
                               allurls.map((ele)=>(
                                <tr key={ele._id}>
                                    <td>{ele.full}</td>
                                    <td><button style={{color:"blue",background:"#fff",border:"none",cursor:"pointer"}} onClick={()=>handleclick1(ele.short)}>{ele.short}</button></td>
                                    <td style={{color:"gold"}}>{ele.clicks}</td>
                                </tr>
                               ))
                             }
                        </tbody>
                    </table>
                  </div>
                </div>
            </div>
        )
    }
    
}