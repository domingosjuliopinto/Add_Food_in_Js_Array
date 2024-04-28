import { Link } from 'react-router-dom'
import './headnav.css'

function HeadNav(){
    const handleLogout = async () => {
        try {
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/home";
        }
    }

    const name = localStorage.getItem('name')
    const id = localStorage.getItem('id')

    return(
        <div className='Navbar_Div'>
                <div className='leftn'>
                    <Link to='/home'><button>Home</button></Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className='rightn'>
                    <b>{name}</b>
                    <p style={{fontSize:"14px"}}>{id}</p> 
                </div>
        </div>
    )
}

export default HeadNav