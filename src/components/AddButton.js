import React from 'react'
import './styles/add_button.css'
import addicon from './images/add.png'
import { useNavigate } from 'react-router-dom';  
export default function Add_button() {
  const navigate = useNavigate();
  return (
    <div className='add_btn_container'>
        <button type="button" onClick={function(){navigate("/add-item")}} className="btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Add Note">
            <img src={addicon} alt="add" />
        </button>
    </div>
  )
}

