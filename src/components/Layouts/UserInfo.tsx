import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import { motion } from "framer-motion";

const Modal = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-items: center;
  top: 80px;
  right: 125px;
  padding: 15px 18px;
  border-radius: 15px;
  color: ${(props) => props.theme.modalTextColor};
  background-color: ${(props) => props.theme.modalColor};
  font-size: 14px;
  transform-origin: top right;
  z-index: 1;
`;

const UserEmail = styled.div`
  margin-bottom: 16px;
`;
const SignOut = styled.div`
  align-self: flex-end;
`;

const modalVar = {
  anime: { scale: 1 },
  exit: { scale: 0 },
};

interface IProps {
  clicked: boolean;
}

function UserInfo({ clicked }: IProps) {
  const onSignOut = () => {
    signOut(auth).then().catch();
  };
  return (
      <Modal
        variants={modalVar}
        initial={false}
        animate={clicked ? "anime" : "exit"}
      >
        <UserEmail>{auth.currentUser?.email}</UserEmail>
        <SignOut onClick={onSignOut}>Sign Out</SignOut>
      </Modal>
  );
}

export default UserInfo;
