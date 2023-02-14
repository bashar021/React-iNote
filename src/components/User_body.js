import React, { useState, useEffect } from 'react'
import './styles/user_body.css'
import Navbar from './Navbar'
import AddButton from './AddButton'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useContext } from 'react'
import deleteicon from './images/trash.png'
import editicon from './images/edit.png'
import threedots_dark from './images/threedots_light.png'
import saveicon from './images/save.png'
import left_arrow from './images/left_arrow.png'
import Get from '../controlers/Get.js'
import Postdata from '../controlers/Post.js'
import userdatacontext from '../context/user_data/User_data_context';

export default function User_profile(props) {
  let user_data = useContext(userdatacontext)
  const navigate = useNavigate();
  let [editnote, updateditnotes] = useState({})
  let [usernotes, updateusernotes] = useState([])
  let [edit, updateedit] = useState(false)
  let [title, updatetitle] = useState('');
  let [discrip, updatediscript] = useState('');
  let [search_key,update_search_key] = useState('')

  useEffect(() => {
    if(user_data.userauth === 'false' || Cookies.get('jwt') == null){
        navigate('/')
    }else{
      updateusernotes(user_data.usernotes)
    }
    
    
  },[navigate,user_data]);
  
  function editnotes(note,index) {
    updateedit(true)
    updateditnotes({note,index})
    updatetitle(note.title)
    updatediscript(note.dicription)
  }
  async function saveeditnote(noteid,index) { 
    let url = `${process.env.REACT_APP_API_URL}user/note/update/${noteid}`;
    let postdata = { title:title,dicription:discrip}
    let data = await Postdata(url,postdata,Cookies.get('jwt'))
    if(data.success === 'true'){
      let notesrarr = user_data.usernotes
      let dataobject = notesrarr[index]
      let {_id} = dataobject
      notesrarr[index] = {title:title,dicription:discrip,_id:_id}
      user_data.update_user_notes_arr(notesrarr)
      navigate('/notes')
      updateedit(false)
      
    }
  }
  async function deletenote(noteid,noteindex){
    const url = `${process.env.REACT_APP_API_URL}user/note/delete/${noteid}`
    let data = await Get(url,Cookies.get('jwt'))
    if(data.success === 'true'){
      let notesrarr = user_data.usernotes
      notesrarr.splice(noteindex,1)
      user_data.update_user_notes_arr(notesrarr)
      navigate('/notes')
    }
  }
  function search_note(){
    let note_container = document.getElementsByClassName('note_container')
    for (let index = 0; index < note_container.length; index++) {
      if(!note_container[index].innerText.toLowerCase().includes(search_key)&& search_key.length >1){
        note_container[index].style.display = 'none';
      }else{
        note_container[index].style.display = "inline-block";
      }
    }
    
  }
  return (
    <>
    <div className={user_data.userauth === 'false' || !props.user_auth ? 'hide' : 'visible'}>
      <div  className={edit === true ? 'hide' : 'visible'}>
        <Navbar update_search_key = {update_search_key} search_note ={search_note}></Navbar>
        <AddButton></AddButton>
        <div className='user_body_container'>
          {/* <p className='h3'>Please login</p> */}
          {usernotes.length > 0 ? usernotes.map((word, index) => {
            return <div key={index}  className='note_container'>
              <div className='edit_box'>
                <button onClick={function () { deletenote(word._id,index) }}><img src={deleteicon} alt="delete" /></button>
                <button onClick={function () { editnotes(word,index) }}><img src={editicon} alt="edit" /></button>
              </div>
              <div className='title_box'>
                <p>{word.title}</p>
              </div>
              <div className='discription_box'>
                <p>{word.dicription}</p>
              </div>
            </div>
          }) : <span className='no_item' style={{ display: 'block' }} >No item</span>}

        </div>
      </div>
      <div className={edit === true ? 'visible' : 'hide'}>
        <div className='adding_form_container'>
          <div className='adding_form_box'>
            <button onClick={function () { updateedit(false) }} className="add_item_back_btn"><img src={left_arrow} alt="" /></button>
            <div className='threedot_btn_box'>
              <button type='button' onClick={function () { saveeditnote(editnote.note._id,editnote.index) }} className='save_bt'><img src={saveicon} alt="" /></button>
              <button className="btn threedotbt dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false"><img src={threedots_dark} alt="threedot" /></button>
              <ul className="dropdown-menu" aria-labelledby="defaultDropdown">
                <li className="dropdown-item">Menu item</li>
                <li className="dropdown-item">Menu item</li>
                <li className="dropdown-item">Menu item</li>
              </ul>
            </div>
            <form onSubmit={function (event) { event.preventDefault() }} className='adding_form'>
              <input type="text" value={title} onChange={function (event) { updatetitle(event.target.value) }} className='title_input' placeholder='Title' />
              <textarea value={discrip} onChange={function (event) { updatediscript(event.target.value); }} className='dis_input' name="discription" rows="22" placeholder='Discription'></textarea>
            </form>
          </div>
        </div>
      </div>

    </div>

    </>

  )
}
