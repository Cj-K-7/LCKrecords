import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../../firebase";
import Loader from "../Layouts/Loader";
import MatchForm from "./MatchForm";
import { IMatchProps } from "../utils/utils";
import { schedules } from "../../samples/LCK2022SPRING";
import { sample } from "../../samples/sample";

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  margin-left: 30px;
  h1 {
    font-size: 32px;
  }
`;

function Operation() {
  // user 로그인 상태에 따라 조작 가능 여부 추가가 가능하면 좋을듯.

  const [leftMatches, setLeftMatches] = useState<DocumentData[]>();
  const onWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    console.log(value);
  };
  const getData = async () => {
    const que = doc(database, "DB", "SpringSplit");
    const document = await getDoc(que);
    //const que = query(doc(database, "DB", "SpringSplit"));
    if (document.exists()) {
      const matches: IMatchProps[] = document.data().sample;
      setLeftMatches(
        matches
          .sort((pre, next) =>
            new Date(pre.date) > new Date(next.date) ? 1 : -1
          )
          .filter((match) => !match.isDone)
      );
    }
  };

  // const setBase = async () => {
  //   await setDoc(doc(database, "DB", "SpringSplit"), {sample})
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <h1>OPERATION PANEL</h1>
      <br />

    <form>

      <label>
        Play Off start :
        <input onChange={onWeekChange} type="date" name="playOffSeason"></input>
        Play Off end :
        <input onChange={onWeekChange} type="date" name="playOffSeason"></input>
      </label>
    </form>
      {/* <button onClick={() => setBase()}>Set Base</button> */}
      {leftMatches ? (
        leftMatches.length === 0 ? (
          <h1> We Are Now Preparing Next Season , Thank You </h1>
        ) : (
          <>
            {leftMatches.map((match, index) => (
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
        )
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default Operation;
