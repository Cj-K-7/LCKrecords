import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Operation from "../components/Operation";
import { auth, database } from "../firebase";

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
const Form = styled.form`
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function Admin() {
  const { register, handleSubmit } = useForm<IdataProps>();
  const onSubmit = async (data: IdataProps) => {
    await setDoc(doc(database, "DB", "LB", "teams", data.name), data);
  };
  return (
    <Container>
      <Operation />
    </Container>
  );
}

export default Admin;
