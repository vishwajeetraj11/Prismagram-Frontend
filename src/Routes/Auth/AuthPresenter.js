import React from "react";
import styled from "styled-components";
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
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Login"} />
          </form>
        )}
        {action === "SIGNUP" && (
          <form onSubmit={onSubmit}>
            <Input placeholder={"First Name"} {...firstname} />
            <Input placeholder={"Last Name"} {...lastname} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Button text={"Sign up"} />
          </form>
        )}
        {
          action === "CONFIRM_SECRET" && (
            <form onSubmit={onSubmit}>
            <Input placeholder="Paste your secret" required {...secret}></Input>
            <Button text={"Confirm"} />
            </form>
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
