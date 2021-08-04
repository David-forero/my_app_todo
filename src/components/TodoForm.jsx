import React, { useState } from "react";
import { Bell, CalendarDate, Clock, Palette, X } from "react-bootstrap-icons";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const TodoForm = ({ handlesubmit, heading, setText, text, day, setDay, time, setTime, projects, showButtons = false, setShowModal = false, todoProject, setTodoProject }) => {


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form className='TodoForm' onSubmit={handlesubmit}>
            <div className="text">
              {
                  heading && <h3>
                      {heading}
                  </h3>
              }
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="to do..."
                autoFocus
              />
            </div>

            <div className="remind">
              <Bell /> Remid Me!
            </div>

            <div className="pick-day">
              <div className="title">
                <CalendarDate />

                <p>Choose a day</p>
              </div>
              <DatePicker value={day} onChange={(day) => setDay(day)} />
            </div>

            <div className="pick-time">
              <div className="title">
                <Clock />

                <p>Choose a time</p>
              </div>
              <TimePicker value={time} onChange={(time) => setTime(time)} />
            </div>

            <div className="pick-project">
              <div className="title">
                <Palette />

                <p>Choose a projec</p>
              </div>

              <div className="projects">
                {
                   projects.length > 0 ? 
                   projects.map(project => 
                    <div 
                      className={`project ${todoProject === project.name ?  "active" : ""}`} 
                      key={project.id}
                      onClick={() => setTodoProject(project.name)}
                    >
                        {project.name}
                    </div>
                    
                  ) : <div  style={{color: '#ff0000'}}>Please add a project before proceeding</div>
                }
              </div>
            </div>

           {
               showButtons &&
               <div>
                   <div className="cancel" onClick={() => setShowModal(false)}>
                     <X size="40" />
                    </div>
        
                    <div className="confirm">
                     <button>+ Add to do</button>
                    </div>
               </div>

           }
          </form>
        </MuiPickersUtilsProvider>
    )
}

export default TodoForm
