import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import Loader from "./Loader";

const Board = styled.div`
  min-width: 600px;
  padding: 0px 30px;
  h1 {
    font-size: 90px;
    margin-bottom: 13px;
  }
`;
const Table = styled(motion.div)`
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  gap: 12px;
  height: auto;
  div:nth-child(1) {
    background-image: linear-gradient(
      30deg,
      rgb(75, 69, 184),
      5%,
      transparent 25%
    );
  }
  div:nth-child(2) {
    background-image: linear-gradient(
      30deg,
      rgb(75, 69, 184),
      5%,
      transparent 25%
    );
  }
  div:nth-child(3) {
    background-image: linear-gradient(
      30deg,
      rgb(75, 69, 184),
      5%,
      transparent 25%
    );
  }
  div:nth-child(4) {
    background-image: linear-gradient(
      30deg,
      rgb(75, 69, 184),
      5%,
      transparent 25%
    );
  }
  div:nth-child(5) {
    background-image: linear-gradient(
      30deg,
      rgb(75, 69, 184),
      5%,
      transparent 25%
    );
  }
  div:nth-child(6) {
    background-image: linear-gradient(
      30deg,
      rgb(75, 69, 184),
      5%,
      transparent 25%
    );
  }
`;
const Label = styled.div`
  width: 600px;
  display: grid;
  grid-template-columns: 280px repeat(4, 1fr);
  padding-bottom: 5px;
  margin-bottom: 12px;
  border-bottom: 3px solid ${(props) => props.theme.textColor};
  span {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
  span:first-child {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    text-align: start;
    svg {
      margin-right: 5px;
      width: 20px;
      height: 20px;
      path {
        fill: rgb(75, 69, 184);
      }
    }
  }
`;
const Team = styled(motion.div)`
  width: 600px;
  display: grid;
  grid-template-columns: 70px 70px 140px repeat(4, 1fr);
  align-items: center;
  span {
    font-size: 20px;
    text-align: center;
    font-weight: 500;
  }
  span:first-child {
    font-size: 32px;
    font-weight: 900;
  }
  &::after {
    content: "";
    width: 600px;
    height: 3px;
    background: linear-gradient(to right, transparent, rgb(60, 55, 78));
  }
`;

const Name = styled.h2`
  font-size: 30px;
`;

// declare module "firebase/firestore" {
//   export interface DocumentData {
//     name: string;
//     match_win: number;
//     match_lose: number;
//     round_win: number;
//     round_lose: number;
//   }
// }

const tableVar = {
  hidden: {},
  visible: {
    transition: {
      duration: 0.6,
      delayChildren: 0.8,
      staggerChildren: 0.6,

    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function LeaderBoard() {
  const [teams, setTeams] = useState<DocumentData[]>();
  const getData = async () => {
    const que = query(collection(database, "DB", "LB", "teams"));
    const documents = await getDocs(que);
    setTeams(
      documents.docs
        .map((a) => a.data())
        .sort((a, b) => {
          const Apoint = +a.round_win - +a.round_lose;
          const Bpoint = +b.round_win - +b.round_lose;
          if (+a.match_win < +b.match_win) return +1;
          if (+a.match_win > +b.match_win) return -1;
          if (+a.match_win === +b.match_win) {
            if (Apoint < Bpoint) return +1;
            if (Apoint > Bpoint) return -1;
            return 0;
          }
          return 0;
        })
    );
  };

  useEffect(() => {
    getData();
  },[]);

  return (
    <Board>
      <h1>STANDINGS</h1>
      <Label>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M0 0H512V512H0V0z" />
          </svg>
          = Playoffs
        </span>
        <span>Change</span>
        <span>W/L</span>
        <span>+/-</span>
        <span>STREAK</span>
      </Label>
      {teams ? (
        <Table variants={tableVar} initial="hidden" animate="visible">
          {teams?.map((a, index) => (
            <Team key={index} variants={item} transition={{ duration: 1 }}>
              <span>{index + 1}</span>
              <img
                style={{ width: 50, height: 50 }}
                src={require(`../images/${a.name}_reverse.png`)}
                alt={"Team's Icon"}
              />
              <Name>{a.name}</Name>
              <span>-</span>
              <span>
                {a.match_win} - {a.match_lose}
              </span>
              <span>
                {+a.round_win - +a.round_lose > 0
                  ? `+${+a.round_win - +a.round_lose}`
                  : `${+a.round_win - +a.round_lose}`}
              </span>
              <span>-</span>
            </Team>
          ))}
        </Table>
      ) : (
        <Loader />
      )}
    </Board>
  );
}

export default LeaderBoard;