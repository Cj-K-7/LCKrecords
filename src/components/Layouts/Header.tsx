import styled from "styled-components";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { LCK } from "../SVGs";

const HeaderBox = styled.div`
  width: 100vw;
  display: flex;
  background-color: transparent;
  z-index: 1;
`;
const Margin = styled.div`
  margin: 23px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  a {
    cursor: pointer;
    padding: 0px 20px;
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  svg path {
    fill: ${(props) => props.theme.textColor};
  }
`;

const Cover = styled.div`
  border-radius: 50%;
  padding: 5px;
  width: 30px;
  height: 30px;
  justify-self: flex-end;
  margin-right: 23px;
  overflow: hidden;
  &:hover {
    background-color: ${(props) => props.theme.textColor};
    path {
      fill: ${(props) => props.theme.backgroundColor};
      animation: user 0.2s;
      @keyframes user {
        0% {
          transform: translateY(1000px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    }
  }
`;
const User = styled.svg`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  transition: all 0.5s ease-in-out;
`;

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <HeaderBox>
        <Margin>
          <Menu>
            <Link to="/">HOME</Link>
            <Link to="/matches">MATCH</Link>
            <Link to="/admin">ADMIN</Link>
          </Menu>
          <Info>
            {auth.currentUser ? (
              <Cover>
                <User
                  onClick={() => setIsClicked((pre) => !pre)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                </User>
              </Cover>
            ) : null}
            <LCK/>
          </Info>
        </Margin>
      </HeaderBox>
      {auth.currentUser && <UserInfo clicked={isClicked} />}
    </>
  );
}

export default Header;
