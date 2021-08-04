import React, { useState, useContext, useEffect} from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import firebase from '../firebase';
import {TodoContext} from '../context';
import moment from 'moment';
import { calendarItems } from '../constants';
import randomcolor from 'randomcolor';

const AddNewTodo = () => {
  const {selectedProject, projects} = useContext(TodoContext)


  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [todoProject, setTodoProject] = useState();

  useEffect(() => {
    setTodoProject(selectedProject)
  }, [selectedProject])

  function handlesubmit(e) {
    e.preventDefault()

    if( text && !calendarItems.includes(todoProject)){
        firebase
            .firestore()
            .collection('todos')
            .add(
                {
                    text : text,
                    date : moment(day).format('MM/DD/YYYY'),
                    day : moment(day).format('d'),
                    time : moment(time).format('hh:mm A'),
                    checked : false,
                    color : randomcolor(),
                    projectName : todoProject
                }
            )

        setShowModal(false)
        setText('')
        setDay(new Date())
        setTime(new Date())
    }

  }

  return (
    <div className="AddNewTodo">
      <div className="btn" onClick={() => setShowModal(true)}>
        <button>add todo</button>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          handlesubmit={handlesubmit}
          heading="Add new To do!"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          setTime={setTime}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
};

export default AddNewTodo;
