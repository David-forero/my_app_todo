import React, {useState, useContext} from 'react'
import Modal from './Modal'
import ProjectForm from './ProjectForm'
import { Plus } from 'react-bootstrap-icons'
import firebase from '../firebase';
import { TodoContext } from '../context';

function AddNewProject(){
    // STATE
    const [showModal, setShowModal] = useState(false)
    const [projectName, setProjectName] = useState('');
    const {currentUser} = useContext(TodoContext);

    function handleSubmit(e){
        e.preventDefault()

        if( projectName ){
            const projectsRef = firebase.firestore().collection('projects')

            projectsRef
                .where('name', '==', projectName)
                .get()
                .then( querySnapshot => {
                    if(querySnapshot.empty){
                        projectsRef
                            .add(
                                {
                                    user: currentUser.uid,
                                    name : projectName
                                }
                            )
                    }else{
                        alert('Project already exists!')
                    }
                })
                
            setShowModal(false)
            setProjectName('')
        }
    }

    return (
        <div className='AddNewProject'>
            <div className="add-button">
                <span onClick={() => setShowModal(true)}>
                    <Plus size="20" />
                </span>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <ProjectForm
                    handleSubmit={handleSubmit}
                    heading='New project!'
                    value={projectName}
                    setValue={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='+ Add Project'
                />
            </Modal>
        </div>
    )
}

export default AddNewProject