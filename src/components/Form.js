import React,{useState,useContext,useEffect} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import './styles/form.css'
import Post from '../controlers/Post'
import userdatacontext from '../context/user_data/User_data_context'
import './styles/form.css';
import notebook_image from './images/notebook_image.jpg'
export default function Form(props) {
    const navigate = useNavigate();
   
    useEffect(() => {
        let auth = Cookies.get('jwt')
        console.log('again')
        if(auth){
            navigate('/notes')
        }
      },[navigate]);
    let [username,updateusername] = useState('')
    let [useremail,update_useremail] = useState('')
    let [usernumber,update_usernumber] = useState('')
    let [userpassword,updateuserpassword] = useState('')
    let [remeber_me,updateremember_me] = useState(false)
    let [signup_form,update_signup_form] = useState('false')
    let [alert,update_alert] = useState('')
    let login_spinner = document.getElementById('login_spinner')
   
    let userdata = useContext(userdatacontext)
    async function onclick() {
        let data = await Post(`${process.env.REACT_APP_API_URL}user/login`,{ email: useremail,password:userpassword})
        if(data.success === 'true'){
            if(remeber_me === true){
                Cookies.set('jwt',data.token, { expires: 7 })
            }else{
                Cookies.set('jwt',data.token)
            }
            props.update_user_login(true)
            userdata.updateuser()
            update_alert('')
            login_spinner.style.display = 'block'
            setInterval(function(){
                login_spinner.style.display = 'none'
                navigate('/notes')
            }, 5000); 
           
             
        }else{
            update_alert(data.message)
            setInterval(function(){
                update_alert('')
            }, 20000); 
        }
            
    }
    async function signup(){
        // console.log({name:username, email: useremail,number:usernumber,password:userpassword})
        let data = await Post(`${process.env.REACT_APP_API_URL}user/signup`,{name:username, email: useremail,number:usernumber,password:userpassword})
        if(data.success === 'true'){
            // setCookie('jwt', data.token, );
            Cookies.set('jwt',data.token);
            props.update_user_login(true)
            userdata.updateuser()
            update_alert('') 
            login_spinner.style.display = 'block'
            setInterval(function(){
                login_spinner.style.display = 'none'
                navigate('/notes')
            }, 5000); 
            
        }else{
            update_alert(data.message)  
            setInterval(function(){
                update_alert('')
            }, 10000); 
        }


    }
    return (
        <div className='body_container' style={{backgroundImage:`url(${notebook_image})`}}>
            <div id='login_spinner' className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            {alert.length > 2 ?<div className="alert alert-warning" role="alert">{alert}</div>:<span></span>}
            
            <div className='form_container'>
                <div className="btn-group form_btns" role="group" aria-label="Basic example">
                    <button type="button" onClick={function(){update_signup_form('false')}} className="btn btn-primary">Login</button>
                    <button type="button" onClick={function(){update_signup_form('true')}} className="btn btn-primary">Signup</button>
                </div>

                <div className={`login_form_container  ${signup_form === 'false'?'vissible':'hide'}`}>
                    <form onSubmit={function(e){e.preventDefault()}}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input onChange={function(event){update_useremail(event.target.value)}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={function(event){updateuserpassword(event.target.value)}} type="password" className="form-control" id="exampleInputPassword1"/>
                        </div>
                        <div className="mb-3 form-check">
                                <input type="checkbox" onChange={function(event){event.target.checked?updateremember_me(true):updateremember_me(false)}} className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" style={{color:'white'}} htmlFor="exampleCheck1">Remeber me</label>
                        </div>
                        <button  onClick={onclick} type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
                <div className={`signup_form_container ${signup_form === 'true'?'vissible':'hide'}`} >
                    <form onSubmit={function(e){e.preventDefault()}}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                            <input onChange={function(event){updateusername(event.target.value)}} type="text" className="form-control"  required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input onChange={function(event){update_useremail(event.target.value)}} type="email" className="form-control"  aria-describedby="emailHelp" required/>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                            <input onChange={function(event){update_usernumber(event.target.value)}} type="number" className="form-control" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input onChange={function(event){updateuserpassword(event.target.value)}} type="password" className="form-control"  required/>
                        </div>
                        <button  onClick={signup} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    

                </div>

            </div>
        </div>
    )
}
