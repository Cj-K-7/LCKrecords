import styled from "styled-components";
import Operation from "../components/admin/Operation";

export interface IdataProps {
  name: string;
  match_win: number;
  match_lose: number;
  round_win: number;
  round_lose: number;
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

function Admin() {
  return (
    <Container>
      <Operation />
    </Container>
  );
}

export default Admin;
