import React,{useState} from 'react'
import './styles/adding_form.css'
import Cookies from 'js-cookie'
import threedots_dark from './images/threedots_light.png'
import saveicon from './images/save.png'
import left_arrow from './images/left_arrow.png'
import { useNavigate } from 'react-router-dom';  
import { useContext } from 'react'
import userdatacontext from '../context/user_data/User_data_context';
export default function Adding_form(props) {
    let user_data = useContext(userdatacontext)
    const navigate = useNavigate();
    let [title,updatetitle] = useState('');
    let [discrip,updatediscript] = useState('');
    function savenote(){
         fetch(`${process.env.REACT_APP_API_URL}user/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                jwt:Cookies.get('jwt')
            },
            body: JSON.stringify({ title:title,dicription:discrip}),
        })
            .then((response) => response.json())
            .then((data) => {
                user_data.updateuser()
                navigate('/notes')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
    }
    return (
        <div className='adding_form_container'>
            <div className='adding_form_box'>
                <button onClick={function(){navigate('/')}}  className="add_item_back_btn"><img src={left_arrow} alt="" /></button>
                <div className='threedot_btn_box'>
                        <button type='button' onClick={function(){savenote()}} className='save_bt'><img src={saveicon} alt="" /></button>
                        <button className="btn threedotbt dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false"><img src={threedots_dark} alt="threedot" /></button>
                        <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                            <li  className="dropdown-item">Menu item</li>
                            <li  className="dropdown-item">Menu item</li>
                        </ul>
                </div>
                <form  onSubmit={function(event){event.preventDefault()}} className='adding_form'>
                    <input  type="text" className='title_input' onChange={function(event){updatetitle(event.target.value)}} placeholder='Title' />
                    <textarea onChange={function(event){updatediscript(event.target.value);}} className='dis_input' name="discription" rows="22" placeholder='Discription'></textarea>
                </form>
            </div>
        </div>
    )
}
