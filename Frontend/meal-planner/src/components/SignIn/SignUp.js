import classes from './SignUp.module.css';

import Card from '../UI/Card';
import Button from '../UI/Button';

import { useState } from 'react';

const SignUp = (props) => {
    const [emailValid, setEmailValid] = useState(true);

    const emailChangeHandler = () => {

    };

    const createAccountHandler = () => {

    };


    return (
        <Card>
            <header className={classes.header}>Sign-Up</header>
            <form className={classes.input} onSubmit={createAccountHandler}>
                <label htmlFor="email" id="email" onChange={emailChangeHandler}>Enter Your Email</label>
                <input type="text" id="email"></input>
                <label htmlFor="password" id="password">Enter Your Password</label>
                <input type="text" id="password"></input>
                <label htmlFor="passwordretype" id="passwordretype">Re-Type Password</label>
                <input type="text" id="passwordretype"></input>
                <Button type="submit" content="Create Account"/>
            </form>


        </Card>
     // what the hell//

    );

};

export default SignUp;