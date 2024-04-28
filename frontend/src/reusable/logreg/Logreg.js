import { Link } from 'react-router-dom';

import './logreg.css'

function Logreg(){
    return(
        <div className='Webapp_Div'>
            <div className='left'><Link to="/login"><button>Login</button></Link></div>
            <div className='right'><Link to="/register"><button>Register</button></Link></div>
        </div>
    )
}

export default Logreg