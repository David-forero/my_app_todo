import {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { TodoContext } from './context';


export const PrivateRoute = ({ component: Component, ...props }) => {
    const {currentUser} = useContext(TodoContext)

    return (
        <Route {...props} render={ props => 
            !currentUser ? 
                <Redirect to="/"/> 
            : 
            <Component {...props} />
        }/>
    )
}

export const Authform = ({component: Component, ...props}) =>{
    const {currentUser} = useContext(TodoContext)
    
    return (
        <Route {...props} render={ props => currentUser ? <Redirect to="/dashboard"/> 
            : <Component {...props} />
        }/>
    )
}