import { useEffect, useState } from "react";
import styled from "styled-components";

const Position = styled.div`
  margin: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  h2 {
    font-size: 30px;
  }
`;
const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  div {
    position: absolute;
    border: 5px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.66s;
  }
  div:nth-child(3) {
    animation-delay: -1.33s;
  }
  @keyframes lds-ripple {
    0% {
      top: 90px;
      left: 90px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 180px;
      height: 180px;
      opacity: 0;
    }
  }
`;

function Loader() {
  const [isExceeded, setIsExceeded] = useState(false);

  useEffect(() => {
    const timeExceed = setTimeout(() => setIsExceeded(true), 7000);
    return ()=>clearTimeout(timeExceed);
  }, []);

  return (
    <Position>
      {isExceeded ? (
        <h2>
          We are preparing The next Season. <br />
          <br /> Thank you.
        </h2>
      ) : (
        <Loading>
          <div />
          <div />
          <div />
        </Loading>
      )}
    </Position>
  );
}

export default Loader;
