import styled from "styled-components";
import { LCK } from "../SVGs";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  animation: rotating 6s infinite;
  @keyframes rotating {
      0%{
          transform: rotateX(0deg);
      }
      100%{
          transform: rotateX(360deg);
      }
  }
`;
const Box = styled.div`
  transform-style: preserve-3d;
  position: relative;
  transform: rotateY(20deg) rotateX(28deg);
  &::before{
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      background-color: ${props=>props.theme.backgroundColor2};
      transform: rotateY(90deg) translateZ(-29px);
  }
  & svg {
    position: absolute;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color : ${props=>props.theme.textColor};
    fill: ${props=>props.theme.textColor};
    transform-style: preserve-3d;
    background-color: ${props=>props.theme.backgroundColor2};
    transform: translateZ(30px);
    &:nth-child(2){
        transform: rotateX(90deg) translateZ(30px);
    }
    &:nth-child(3){
        transform: rotateX(180deg) translateZ(30px);
    }
    &:nth-child(4){
        transform: rotateX(270deg) translateZ(30px);
    }
  }
`;

function Logo() {
  return (
    <Container>
      <Box>
            <LCK/>
            <LCK/>
            <LCK/>
            <LCK/>
      </Box>
    </Container>
  );
}

export default Logo;
