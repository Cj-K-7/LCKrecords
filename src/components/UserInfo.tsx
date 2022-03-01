import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import styled from "styled-components";

const Modal = styled.div`
  padding: 13px 10px;
  background-color: ${(props) => props.theme.modalColor};
`;

const SignOut = styled.span``;
function UserInfo() {
  const onSignOut = () => signOut(auth).then().catch();
  return (
    <Modal>
      UserInfo
      <SignOut onClick={onSignOut}>Sign Out</SignOut>
    </Modal>
  );
}

export default UserInfo;
