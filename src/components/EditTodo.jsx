import {useState, useContext, useEffect} from 'react'
import TodoForm from './TodoForm';
import {TodoContext} from '../context';
import moment from 'moment';
import firebase from '../firebase';

const EditTodo = () => {
    // STATE
    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [todoProject, setTodoProject] = useState('')

    // CONTEXT
    const { selectedTodo, projects } = useContext(TodoContext)

    useEffect(() => {
        if(selectedTodo){
            setText(selectedTodo.text)
            setDay(moment(selectedTodo.date, 'MM/DD/YYYY'))
            setTime(moment(selectedTodo.time, 'hh:mm A'))
            setTodoProject(selectedTodo.projectName)
        }
    }, [selectedTodo])

    useEffect(() => {
        if(selectedTodo){
            firebase
                .firestore()
                .collection('todos')
                .doc(selectedTodo.id)
                .update({
                    text,
                    date : moment(day).format('MM/DD/YYYY'),
                    day : moment(day).format('d'),
                    time : moment(time).format('hh:mm A'),
                    projectName : todoProject
                })
        }
        // eslint-disable-next-line
    }, [text, day, time, todoProject])

    function handleSubmit(e){

    }

    return (
        <div>
            {
                selectedTodo && (
                    <div className="EditTodo">
                        <div className="header">
                            Edit Todo
                        </div>

                        <div className="container">
                            <TodoForm
                                handlesubmit={handleSubmit}
                                text={text}
                                setText={setText}
                                day={day}
                                setDay={setDay}
                                time={time}
                                setTime={setTime}
                                projects={projects}
                                setTodoProject={setTodoProject}
                                todoProject={todoProject}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default EditTodo
