import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import Loader from "./Loader";
import MatchForm from "./MatchForm";
import { schedules } from "../LCK2022SPRING";

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: 30px;
  h1{
    font-size: 32px ;
  }
`;

function Operation() {
  const [matches, setmatches] = useState<DocumentData[]>();
  const getData = async () => {
    const que = query(collection(database, "DB", "schedules", "spring"));
    const documents = await getDocs(que);
    setmatches(documents.docs.map((a) => a.data()));
  };

  // const sb = async () => {
  //   await schedules.map((s) =>
  //     setDoc(doc(database, "DB", "schedules", "spring", s.date), s)
  //   );
  // };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <h1>OPERATION PANEL</h1>
      <br/>
      {/* <button onClick={() => sb()}></button> */}
      {matches ? (
        <>
          {matches
            .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))
            .filter((a)=>!a.isDone)
            .map((match) => (
              <MatchForm
                key={match.date}
                round={match.round}
                date={match.date}
                teamA={match.teamA}
                teamB={match.teamB}
                isDone={match.isDone}
              />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default Operation;
