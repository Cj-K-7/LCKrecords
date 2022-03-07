import styled from "styled-components";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

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
const Logo = styled.svg`
  width: 84px;
  height: 60px;
  justify-self: flex-end;
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
            <Logo
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 775 550"
            >
              <g transform="translate(0 550) scale(.1 -.1)">
                <path d="m26 5453c-3-4-6-10-6-14 0-3 781-584 1736-1290 955-705 1738-1288 1741-1295 2-6-89-190-202-408s-203-401-200-406c3-6 10-10 15-10 4 0 175 124 380 275s376 275 381 275 173-122 375-271c201-148 371-272 379-275 7-3 16 0 20 5 3 6-86 190-199 409-114 218-204 402-202 407 2 6 787 588 1744 1295 958 707 1741 1288 1741 1291 1 4-5 9-11 11-15 6-3248-758-3259-769-5-5-138-259-297-566l-290-558-40 73c-22 40-153 294-292 563-139 270-254 491-254 492-1 1-728 173-1616 383-888 209-1620 383-1627 385-6 2-14 1-17-2z" />
                <path d="m1400 705v-665h765 765v175 175h-600-600v490 490h-165-165v-665z" />
                <path d="m3100 705v-665h765 765v175 175h-595-595v320 320h595 595v170 170h-765-765v-665z" />
                <path d="m4800 705v-665h170 170v245 245h343 342l106-238 107-237 186-3c102-1 186 0 186 3s-66 151-146 329l-145 322 145 323c80 178 146 327 146 332s-80 9-183 9h-183l-110-242-110-243-342-3-342-2v245 245h-170-170v-665z" />
              </g>
            </Logo>
          </Info>
        </Margin>
      </HeaderBox>
      {auth.currentUser && <UserInfo clicked={isClicked} />}
    </>
  );
}

export default Header;