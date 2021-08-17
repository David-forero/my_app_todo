import {useContext, useState, useEffect} from 'react'
import Todo from './Todo';
import NextDays from './NextDays'
import {TodoContext} from '../context';


const Todos = () => {
    const {selectedProject, todos, currentUser} = useContext(TodoContext);
    const [orderTodo, setOrderTodo] = useState([]);
    useEffect(() => {
        let data = todos.filter(todo => todo.user === currentUser.uid)
        setOrderTodo(data)
    }, [todos])
   

    return (
        <div className="Todos">
            <div className="selected-project">
                {selectedProject}
            </div>
            <div className="todos">
                {
                    selectedProject === 'next 7 days' ? 
                    <NextDays todos={orderTodo} /> : 
                    orderTodo.map(todo => 
                        <Todo todo={todo} key={todo.id} />    
                    )
                }
            </div>
        </div>
    )
}

export default Todos
