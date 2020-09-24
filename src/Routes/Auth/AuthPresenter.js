import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet"
// import {Helmet} from "rl-react-helmet";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

export default ({
  action,
  username,
  firstname,
  lastname,
  email,
  setAction,
  onSubmit,
  secret,
}) => {
  return (
    <Wrapper>
      <Form>
        {action === "LOGIN" && (
          <>
           <Helmet><title>Login | Prismagram</title></Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} value={email.value} onChange={email.onChange} type="email" />
            <Button text={"Login"} />
          </form>
          </>
        )}
        {action === "SIGNUP" && (
          <>
           <Helmet><title>Signup | Prismagram</title></Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"First Name"} value={firstname.value} onChange={firstname.onChange} />
            <Input placeholder={"Last Name"} value={lastname.value} onChange={lastname.onChange} />
            <Input placeholder={"Email"} value={email.value} onChange={email.onChange} type="email" />
            <Input placeholder={"Username"} value={username.value} onChange={username.onChange} />
            <Button text={"Sign up"} />
          </form>
          </>
        )}
        {
          action === "CONFIRM_SECRET" && (
            <>
          <Helmet><title>Confirm Secret | Prismagram</title></Helmet>
            <form onSubmit={onSubmit}>
            <Input placeholder="Paste your secret" required value={secret.value} onChange={secret.onChange}></Input>
            <Button text={"Confirm"} />
            </form>
            </>
          )
        }
      </Form>
        {
          action !== "CONFIRM_SECRET" && (
            <AuthChanger>
            {action === "LOGIN" ? (
              <>
                Don't have an account?{" "}
                <Link onClick={() => setAction("SIGNUP")}>Sign up</Link>
              </>
            ) : (
              <>
                Have an account?{" "}
                <Link onClick={() => setAction("LOGIN")}>Log in</Link>
              </>
            )}
          </AuthChanger>
          )
        }
    </Wrapper>
  );
};

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AuthChanger = styled(Box)`
  text-align: center;
  padding: 2rem 0;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 4rem;
  padding-bottom: 3rem;
  margin-bottom: 1.5rem;

  form {
    input {
      margin-bottom: 10px;
    }
    button {
      margin-top: 0.6rem;
    }
  }
`;
