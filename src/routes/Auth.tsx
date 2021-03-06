import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { authStateToggle } from "../redux-store/slices/loginSlice";
import { useNavigate } from "react-router-dom";

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
  color: black;
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
  &:hover {
    box-shadow: inset 0 0 10px black;
  }
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
  &:hover {
    box-shadow: inset 0 0 10px black;
  }
`;

interface IForm {
  email: string;
  password: string;
  confirmPW: string | null;
}

function Auth() {
  const [isNew, setIsNew] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const noLogIn = () => {dispatch(authStateToggle(true)); navigation('/')}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  
  const onSubmit = (data: IForm) => {
    //Sign in/up with email/pw
    if (isNew) {
      // ???????????? ?????? ??????
      if (data.password === data.confirmPW) {
        //?????? ??????
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredentail) => {
          console.log(userCredentail.user);
          })
          .catch((err) => {
            console.log("signing UP Err :" + err.code);
            if (err.code === "auth/email-already-in-use") {
              alert("email address aleady in use");
            }
          });
      } else {
        //???????????? ?????? ?????? ??????
        alert("Please check P/W confirm correctly");
      }
    } else {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => console.log(res))
        .catch((err) => {
          console.log("signing IN Err :" + err.code);
          switch (err.code) {
            case "auth/user-not-found":
              alert(
                "Account doesn't exist, check your email-adress or create account"
              );
              break;
            case "auth/wrong-password":
              alert("Incorrect Email or Password");
              break;
            case "auth/too-many-requests":
              alert("Too many request, try later");
              break;
          }
        });
    }
  };
  // social Login
  const providers = {
    google: new GoogleAuthProvider(),
    github: new GithubAuthProvider(),
  };
  
  const signWithSNS = (provider: GoogleAuthProvider | GithubAuthProvider) =>
  signInWithPopup(auth, provider)
  .then((userCredentail) => {
    // const token =
    // GoogleAuthProvider.credentialFromResult(userCredentail)?.accessToken;
    console.log(userCredentail.user);
      })
      .catch((err) => {
        console.log(`${provider} login err :` + err.code);
            /// ????????? ?????? ???????????? ????????? ????????? ?????? ?????? ????????? ?????? ??????
        if (err.code === "auth/account-exists-with-different-credential") {
          alert(
            "Your email Adress already signed Up \nauto-link-email will be preparing soon... "
          );
        }
      });
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    if (name === "Google") {
      signWithSNS(providers.google).then(()=>navigation('/'));
    } else if (name === "Github") {
      signWithSNS(providers.github).then(()=>navigation('/'));
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
          <BTN onClick={onClick} name="Google">
            Continue with Google
          </BTN>
          <BTN onClick={onClick} name="Github">
            Continue with Github
          </BTN>
          <BTN onClick={() => setIsNew((prev) => !prev)}>
            {isNew ? "Go to Sign In" : "Go to create Account"}
          </BTN>
          <BTN onClick={noLogIn} style={{backgroundColor : 'burlywood'}}>
            CONTINUE WITHOUT LOG IN
          </BTN>
        </Options>
      </Box>
    </Container>
  );
}

export default Auth;
