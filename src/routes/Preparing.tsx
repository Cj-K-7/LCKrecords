import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
function Preparing() {
  return (
    <Container>
      <div>
        We are Preparing Next Seasons.
        <br />
        <br />
        Thank you.
      </div>
    </Container>
  );
}

export default Preparing;
