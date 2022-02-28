import { FBauth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  height: fit-content;
  padding: 30px 0px;
  width: 300px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 32px;
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: 40px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Email = styled.input.attrs({ type: "email" })`
  margin-bottom: 16px;
`;
const Password = styled.input.attrs({ type: "password" })`
  margin-bottom: 16px;
`;
const Submit = styled.input.attrs({ type: "submit" })`
  width: 200px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BTN = styled.button`
  width: 200px;
  font-size: 15px;
  padding: 8px 0px;
  margin-top: 12px;
  border: none;
  border-radius: 5px;
`;

interface IForm {
  email: string;
  password: string;
  confirmPW: string | null;
}

function Auth() {
  const [isNew, setIsNew] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    console.log(data);
    if (isNew) {
      // 비밀번호 조건 추가
      if (data.password === data.confirmPW) {
        createUserWithEmailAndPassword(FBauth, data.email, data.password)
          .then((userCredentail) => {
            console.log(userCredentail);
          })
          .catch((err) => console.log(err));
      } else {
        alert("Please check P/W confirm correctly");
        setValue("confirmPW", "");
      }
    } else {
      signInWithEmailAndPassword(FBauth, data.email, data.password)
        .then((res) => console.log(res))
        .catch(() => {
          alert("non-exist-account/ Create an account");
        });
    }
  };

  return (
    <Container>
      <Box>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title>{isNew ? "SIGN UP" : "SIGN IN "}</Title>
          <Email
            {...register("email", { required: "need your email" })}
            placeholder={
              errors.email ? errors?.email?.message : "E-mail Address"
            }
          />
          <Password
            {...register("password", { required: "need password" })}
            placeholder={
              errors.password ? errors?.password?.message : "Password"
            }
          />
          {isNew && (
            <Password
              {...register("confirmPW", {
                required: "feel p/w one more time",
              })}
              placeholder={
                errors.confirmPW ? errors?.confirmPW?.message : "confirm P/W"
              }
            />
          )}
          <Submit value={isNew ? "Sign Up" : "Sign In"} />
        </Form>
        <Options>
          <BTN>Continue with Google</BTN>
          <BTN>Continue with Github</BTN>
          <BTN onClick={() => setIsNew((prev) => !prev)}>
            {isNew ? "Go to Sign In" : "Go to create Account"}
          </BTN>
        </Options>
      </Box>
    </Container>
  );
}

export default Auth;
