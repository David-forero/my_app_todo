import {useState} from 'react'
import ProjectForm from './ProjectForm';

const RenameProject = ({project, setShowModal}) => {
    const [newProjectName, setNewProjectName] = useState(project.name);

    function handleSubmit(e) {
        
    }
    
    return (
        <div className="RenameProject">
            <ProjectForm 
                    handleSubmit={handleSubmit} 
                    heading='New project' 
                    value={newProjectName} 
                    setValue={setNewProjectName} 
                    setShowModal={setShowModal}
                    confirmButtonText="Confirm"
                />
        </div>
    )
}

export default RenameProject
