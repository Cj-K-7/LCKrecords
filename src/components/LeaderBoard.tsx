import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import { IdataProps } from "../routes/Admin";

const Board = styled.div``;
const GridTable = styled.div`
  width: 600px;
  height: auto;
  background-color: white;
`;

declare module "firebase/firestore" {
  export interface DocumentData {
    name: string;
    match_win: number;
    match_lose: number;
    round_win: number;
    round_lose: number;
  }
}

function LeaderBoard() {
  const [data, setData] = useState<DocumentData[]>();
  const [final, setfinalResult] = useState<IdataProps[]>();
  const getData = async () => {
    const q = query(collection(database, "DB", "LB", "teams"));
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => {
      return doc.data();
    });
    setData(results);

    setfinalResult(
      data?.sort((a, b) => {
        if (a.match_win > b.match_win) {
          return 1;
        }
        if (a.match_win < b.match_win) {
          return -1;
        }
        if (a.match_win === b.match_win) {
          if (a.round_win - a.round_lose > b.round_win - b.round_lose) {
            return -1;
          }
          if (a.round_win - a.round_lose < b.round_win - b.round_lose) {
            return 1;
          }
          return 0;
        }
        return 0;
      })
    );
  };

  console.log(data);
  useEffect(() => {
    getData();
  }, []);

  return (
    <Board>
      LEADERBOARD
      <GridTable>
        {data?.map((t) => {
          <div key={t.name}>
            <h1>{t.name}aa</h1>
            <div>{t.match_win}</div>
            <div>{t.match_lose}</div>
            <div>{t.round_win}</div>
            <div>{t.round_lose}</div>
            <div>{t.round_win - t.round_lose}</div>
          </div>;
        })}
      </GridTable>
    </Board>
  );
}

export default LeaderBoard;
