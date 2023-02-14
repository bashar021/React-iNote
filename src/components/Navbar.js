import React from 'react'
import './styles/navbar.css'
import avatar from './images/avatar.png'
import { useContext } from 'react'
import userdatacontext from '../context/user_data/User_data_context'
import { Link} from 'react-router-dom';
import Cookies from 'js-cookie'
export default function Navbar(props) {
    // let user_data = useContext(userdatacontext)
    let userdata = useContext(userdatacontext);
    // const navigate = useNavigate();
    function logout(){
        Cookies.remove('jwt')
        window.location.reload();
    }
    return (
        <div>
            <nav className='navbar_container'>
                <div className='navbar_box'>
                    <Link className="navbar-brand" to="#">iNote</Link>
                    <form className="d-flex search_input_container">
                        <input onChange={function(event){props.update_search_key(event.target.value);props.search_note()}} className="form-control search_input me-2" type="text" placeholder="Search your note" aria-label="Search" />
                    </form>
                    <div className="btn-group avatar_container" role="group">
                        <button id="btnGroupDrop1" type="button" className="btn avatar_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><img className='avatar_img' src={avatar} alt="" /></button>
                        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <li className="dropdown-item">{userdata.userdetails.email}</li>
                            <li onClick={logout} className="dropdown-item">Logout</li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
