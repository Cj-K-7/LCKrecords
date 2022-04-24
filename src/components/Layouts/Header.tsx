import styled from "styled-components";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

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
  & a {
    cursor: pointer;
    padding: 0px 20px;
  }
  & a:hover {
    color: ${(props) => props.theme.textHover};
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  padding-right: 80px;
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

const Sign = styled.h1`
  font-size: 30px;
  margin-right: 20px;
  &:hover {
    text-shadow: 0 0 3px white;
  }
`;

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigate();

  //season 에 따라 Routing 위치 바뀌게끔 설계 추후 추가 필요.

  return (
    <>
      <HeaderBox>
        <Margin>
          <Menu>
            <Link to="/">HOME</Link>
            <Link to="/matches/spring">MATCH</Link>
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
            ) : (
              <Sign onClick={() => navigation("/auth")}> Sign In </Sign>
              )}
              <Logo />
          </Info>
        </Margin>
      </HeaderBox>
      {auth.currentUser && <UserInfo clicked={isClicked} />}
    </>
  );
}

export default Header;
