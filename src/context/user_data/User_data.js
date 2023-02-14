import Userdatacontext from "./User_data_context";
import React,{ useState } from "react";
import Get from '../../controlers/Get'
import Cookies from 'js-cookie'
const User_data = function(props){
    let  [usernotes,updateusernotes] = useState([]);
    let [userauth,update_userauth] = useState('true')
    let [userdetails,updateuserdetails] = useState({name:'bashar'});
    let updateuser = async function(){
        let data = await Get(`${process.env.REACT_APP_API_URL}user/notes`,Cookies.get('jwt') )
        updateusernotes(data.notes)
        updateuserdetails({name:data.name,email:data.email,number:data.number,password:data.password})
        if(data.success === 'false'){
            update_userauth('false')
        }else{
            update_userauth('true')
        }

    }
    let update_user_notes_arr  = function(arr){
        updateusernotes(arr)
        console.log('arra updated')
    }
    return(
        <Userdatacontext.Provider value={{updateuser,usernotes,update_user_notes_arr,userdetails,userauth,}}>
            {props.children}
        </Userdatacontext.Provider>
    )

}
export default User_data;