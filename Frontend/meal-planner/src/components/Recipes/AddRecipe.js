import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./AddRecipe.module.css";

import { useDispatch, useSelector } from "react-redux";
import { sendRecipeData } from "../../store/recipe-actions";
import { useRef, useState, useEffect } from "react";
import { notificationActions } from "../../store/notifcation-slice";

let isInitial = true;
const AddRecipe = (props) => {
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState({
    name: "",
    servings: 0,
  });
  const typeInputRef = useRef();

  const dispatch = useDispatch();
  let message = useSelector((state) => state.notification.message);

  useEffect(() => {
    if (message === "Recipe Added" && !isInitial) {
      isInitial = true;
      notificationActions.sendNotification({ message: "" });
      props.modalExitHandler();
    }
  }, [message, props]);

  const nameChangeHandler = (event) => {
    setRecipe({
      ...recipe,
      name: event.target.value,
    });
  };

  const servingsChangeHandler = (event) => {
    setRecipe({
      ...recipe,
      servings: event.target.value,
    });
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("in submit");
    const { name, servings } = recipe;
    if (name.trim().length === 0) {
      setError("Invalid Name");
    } else if (servings < 0 || servings > 10) {
      setError("Invalid Serving Size");
    } else {
      setError("");
      const userId = localStorage.getItem("userId");
      console.log("in valid");
      dispatch(
        sendRecipeData({
          userId: userId,
          enteredName: name,
          enteredType: typeInputRef.current.value,
          enteredServings: servings,
        })
      );
    }
    isInitial = false;
  };
  console.log(message);

  const exitModal = () => {
    props.modalExitHandler();
  };

  return (
    <div>
      <Modal
        hideModal={exitModal}
        title="Add Recipe"
        footer={
          <Button
            type="submit"
            form="add-recipe"
            content="Save"
            onClick={formSubmitHandler}
          />
        }
      >
        <form
          className={classes.form}
          id="add-recipe"
          onSubmit={formSubmitHandler}
        >
          <label htmlFor="name" id="name">
            Name *
          </label>
          <input
            type="text"
            id="name"
            className={
              error === "Invalid Name" && !isInitial ? classes.invalid : ""
            }
            onChange={nameChangeHandler}
          ></input>
          <label htmlFor="name" id="name">
            Type *
          </label>
          <select defaultValue="Breakfast" ref={typeInputRef} id="type">
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
          <label htmlFor="servings" id="servings">
            Servings *
          </label>
          <input
            type="number"
            id="servings"
            min="1"
            max="10"
            className={
              error === "Invalid Serving Size" && !isInitial
                ? classes.invalid
                : ""
            }
            onChange={servingsChangeHandler}
          ></input>
        </form>
        <div className={classes.error}>
          <p>{error}</p>
        </div>
      </Modal>
    </div>
  );
};

export default AddRecipe;
