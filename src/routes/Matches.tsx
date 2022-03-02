import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

function Matches() {
  return (
    <Container><h1>MATCH</h1></Container>
  )
}

export default Matches