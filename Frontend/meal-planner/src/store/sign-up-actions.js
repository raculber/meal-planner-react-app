import Axios from "axios";
import { notificationActions } from "./notifcation-slice";

export const sendUserData = (userData) => {
  return (dispatch) => {
    dispatch(notificationActions.sendNotification({ message: "Loading..." }));

    Axios.post("http://localhost:3001/api/add-user", userData).then(
      (response) => {
        let countObj = response.data[0];
        let count = countObj["COUNT(email)"];
        let userId = response.data[1];

        if (count > 0) {
          dispatch(
            notificationActions.sendNotification({
              message: "Error creating account. E-mail already in use.",
            })
          );
        } else {
          dispatch(
            notificationActions.sendNotification({
              message: "Success",
              optional: userId,
            })
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
};

export const validateSignIn = (userData) => {
  return (dispatch) => {
    Axios.post("http://localhost:3001/api/sign-in", userData).then(
      (response) => {
        let id = response.data["userId"];
        if (id === undefined) {
          dispatch(
            notificationActions.sendNotification({
              message: "Error logging in",
            })
          );
        } else {
          console.log(id);
          dispatch(
            notificationActions.sendNotification({
              message: "Success",
              optional: id,
            })
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
};
