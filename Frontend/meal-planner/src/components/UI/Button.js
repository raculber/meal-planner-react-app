import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button type={props.type ? props.type : "button" } className={classes.button}>
            {props.content}
        </button>

    );

};

export default Button;