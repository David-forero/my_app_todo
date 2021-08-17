import {useState, useContext, useEffect} from 'react';
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons'
import { TodoContext } from '../context';
import AddNewProject from './AddNewProject'
import Project from './Project'
import {useSpring, animated} from '@react-spring/web';

const Projects = () => {
   

    const [showMenu, setShowMenu] = useState(true);
    const [edit, setEdit] = useState(false);
    const pencilColor = edit ? "#1EC94C" : "#00000"
    const [orderProject, setOrderProject] = useState([]);
    const {projects, currentUser} = useContext(TodoContext);

    useEffect(() => {
        let data = projects.filter(project => project.user === currentUser.uid)
        setOrderProject(data)
    }, [projects])
    const spin = useSpring({
        transform: showMenu ? 'rotate(0deg)' : 'rotate(180deg)',
        config: {friction: 10}
    })

    const menuAnimation = useSpring({
        display: showMenu ? 'block' : 'none',
        lineHeight: showMenu ? 1.2 : 0
    })

    return (
        <div className="Projects">
             <div className="header">
                <div className="title">
                    <Palette size="18" />
                    <p>Projects</p>
                </div>
                <div className="btns">
                    {
                        showMenu && orderProject.length > 0 &&
                        <span className='edit' onClick={ () => setEdit(edit => !edit)}>
                            <PencilFill size="15" color={pencilColor}/>
                        </span>
                    }
                    <AddNewProject />
                    <animated.span 
                        className='arrow'
                        onClick={() => setShowMenu(!showMenu)}
                        style={spin}
                    >
                        <CaretUp size="20" />
                    </animated.span>
                </div>
            </div>
            <animated.div style={menuAnimation} className="items">
                {
                    orderProject.map( project => 
                        <Project
                            project={project}
                            key={project.id}
                            edit={edit}
                        />
                    )
                }
            </animated.div>
        </div>
    )
}

export default Projects
