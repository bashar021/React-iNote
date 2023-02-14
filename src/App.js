
import Form from './components/Form'
import Cookies from 'js-cookie'
import React,{useState,useContext,useEffect} from 'react'
import UserBody from './components/User_body'
import {Route,BrowserRouter as Router ,Routes} from "react-router-dom"
import AddingForm from './components/Adding_form'
import userdatacontext from './context/user_data/User_data_context.js'



function App() { 
  let [user_login,update_user_login] = useState(false)
  let user_auth = Cookies.get('jwt')
  let a = useContext(userdatacontext)
   useEffect(()=>{
    if(user_auth || user_login === true){
      a.updateuser()
    }
  }, [a,user_login,user_auth ]);
  
  return (
    
   
    <Router>
       <Routes>
        <Route path='/notes'  element={<UserBody user_auth={user_auth} ></UserBody>}></Route>
        <Route path='/add-item' element={<AddingForm></AddingForm>}></Route>
        <Route path='/'  element={<Form update_user_login={update_user_login} ></Form>}></Route>
       </Routes>
    </Router>

    
  );
}
export default App;
