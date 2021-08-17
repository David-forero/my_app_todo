import {useContext} from 'react'
import logo from '../images/logo.png';
import firebase from '../firebase';
import { useHistory, Link } from 'react-router-dom';
import {TodoContext} from '../context'

const User = () => {
    const {currentUser} = useContext(TodoContext);
    const history = useHistory()
    const logout = async () =>{
        try {
            await firebase.auth().signOut();
            history.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    console.log(currentUser);
    return (
        <div className="User">
            <div className="logo">
                <img src={logo} alt="logo" />
                {/* <p>{currentUser.email}</p> */}
            </div>

            <div className="info">
                <p>NightCode</p>
                <Link to="#" onClick={() => logout()}>Logout</Link>
            </div>
        </div>
    )
}

export default User
