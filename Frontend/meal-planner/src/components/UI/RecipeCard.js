import classes from "./RecipeCard.module.css";
import editIcon from "../../images/edit-icon.png";
import trashIcon from "../../images/trash.png";

const RecipeCard = (props) => {
  return (
    <div className={classes.card}>
      <header className={classes.header}>
        <img
          className={classes.edit}
          src={editIcon}
          alt="Edit Icon"
          onClick={props.onEdit}
        />
        <h1>{props.header}</h1>
        <img
          className={classes.remove}
          src={trashIcon}
          alt="Remove Icon"
          onClick={props.onRemove}
        />
      </header>
      <div className={classes.content}>
        <h2>Type: {props.type}</h2>
        <h2>Servings: {props.servings}</h2>
      </div>
    </div>
  );
};

export default RecipeCard;
