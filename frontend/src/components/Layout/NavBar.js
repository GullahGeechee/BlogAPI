import {Link, NavLink} from 'react-router-dom'; 

const NavBar = (props) => {
 return (
    <nav >
        <ul className='nav'>
        
        <li className='nav-item'><Link to='/Home' className='nav-link'>Home</Link> </li>
     
        <li className='nav-item'><NavLink to='/About' className='nav-link'>About</NavLink></li>
        <li className='nav-item'><NavLink to='/' className='nav-link'>Landing</NavLink></li>
        </ul>
        {props.user && <span>{props.user.username}</span>} 
        </nav>
        );

};


export default NavBar;