import {useContext} from 'react'
import Todo from './Todo';
import NextDays from './NextDays'
import {TodoContext} from '../context';


const Todos = () => {
    const {selectedProject, todos} = useContext(TodoContext);

   

    return (
        <div className="Todos">
            <div className="selected-project">
                {selectedProject}
            </div>
            <div className="todos">
                {
                    selectedProject === 'next 7 days' ? 
                    <NextDays todos={todos} /> : 
                    todos.map(todo => 
                        <Todo todo={todo} key={todo.id} />    
                    )
                }
            </div>
        </div>
    )
}

export default Todos
