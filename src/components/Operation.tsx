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
import { schedules } from "../LCK2022SPRING";
import Loader from "./Loader";

const Container = styled.div``;

const today = new Date();
const todayMatch = `${today.getMonth()}.${today.getMonth()}`;

interface IMatchProps {
  match_win: string;
  match_lose: string;
  win_score: number;
  lose_score: number;
}


function Operation() {
  const [matches, setmatches] = useState<DocumentData[]>();
  const getData = async () => {
    const que = query(collection(database, "DB", "schedules", "spring"));
    const documents = await getDocs(que);
    setmatches(documents.docs.map((a) => a.data()));
  };

  const sb = async () => {
    await schedules.map((s) =>
      setDoc(doc(database, "DB", "schedules", "spring", s.date), s)
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <button onClick={()=>sb()}></button>
      {matches ? (
        <>
          {matches.map((match) => (

          ))}
        </>
      ) : <Loader/>}
    </Container>
  );
}

export default Operation;
