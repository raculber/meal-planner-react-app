import Axios from "axios";
import { notificationActions } from "./notifcation-slice";

export const sendUserData = (userData) => {
  return (dispatch) => {
    dispatch(notificationActions.sendNotification({ message: "Loading..." }));

    Axios.post("http://localhost:3001/api/add-user", userData).then(
      (response) => {
        let count = response.data["COUNT(email)"];
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
