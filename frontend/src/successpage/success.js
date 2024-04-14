import '../App.css'
import { MDBBtn }
  from 'mdb-react-ui-kit';

function Success(){
    const handleLogout = async () => {
        try {
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/success";
        }
    }

    return(
        <div className="App App-header">
            <i className="far fa-circle-check fa-10x text-success"></i>
            <h1 className="text-success">Logged in Successfully</h1>
            <MDBBtn size='lg' onClick={handleLogout}>
                    Log out
            </MDBBtn>
        </div>
    )
}

export default Success