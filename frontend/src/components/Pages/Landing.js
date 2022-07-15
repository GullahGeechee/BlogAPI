import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginFrom";
import {useState} from 'react';

const Landing = (props) => {
   const [hasAccount, setHasAccount] = useState(false)
   const {setUser} = props
    return(
        <div>
            <h1>Landing</h1>
           { hasAccount === false ? (
            <div>
            <RegisterForm setUser={setUser} />
            <p>Already have an account?{''} 
            <span className='btn btn-primary' onClick = {() =>setHasAccount(true)}> Login </span>{''}</p>
            </div>
           ) : ( <LoginForm /> )}
           
    </div>
    );
 };


 export default Landing;