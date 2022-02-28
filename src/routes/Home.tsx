import { signOut } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
const SignOut = styled.div``;
function Home() {
  const onSignOut =()=> signOut(auth).then().catch();
  return (
    <Container>
      hello????????
      <SignOut onClick={onSignOut}>Sign Out</SignOut>
    </Container>
  );
}

export default Home;
