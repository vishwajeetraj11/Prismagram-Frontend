import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOGIN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("LOGIN");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");

  const secret = useInput("");

  // const [requestSecretMutation, { data }] = useMutation(LOG_IN, {
  const [requestSecretMutation] = useMutation(LOG_IN, {
    update: (_, result) => {},
    variables: {
      email: email.value,
    },
  });

  // const [createAccountMutation, {data}] = useMutation(CREATE_ACCOUNT, {
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstname.value,
      lastName: lastname.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  })

  const [localLoginMutation] = useMutation(LOCAL_LOGIN) 

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === "LOGIN") {
      if (email.value !== "") {
        try {
          const result = await requestSecretMutation();
          const {
            data: { requestSecret },
          } = result;

          if (!requestSecret) {
            toast.error("You don't have an account yet, create one");
            setTimeout(() => setAction("SIGNUP"), 3000);
          } else {
            toast.success("Check your inbox for login secret");
            setAction("CONFIRM_SECRET")
          }
        } catch (e) {
          toast.error("Can't request Secret, try again");
        }
      } else {
        toast.error("Email is Required");
      }
    } else if (action === "SIGNUP") {
    
      if (
        username.value !== "" &&
        email.value !== "" &&
        firstname.value !== "" &&
        lastname.value !== ""
      ) {
        try {
          const result = await createAccountMutation();
          const {
            data: { createAccount },
          } = result;

          if (!createAccount) {
            toast.error("Can't create Account");
          } else {
            toast.success("Account created! Log in Now");
            setTimeout(() => setAction("LOGIN"), 3000);
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("All fields are Required!");
      }
    } else if(action === "CONFIRM_SECRET") {
      if(secret.value !== "") {
        try {
          const {data: {confirmSecret: token}} = await confirmSecretMutation();
          if(token !== "" && token !== undefined) {
            localLoginMutation({
              variables: {token}
            })
            window.location.refresh(true);
          } else{
            throw Error();
          }
        } catch(error) {
          toast.error("Can't confirm secret")
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstname={firstname}
      lastname={lastname}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
