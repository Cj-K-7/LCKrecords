import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Filter from "../components/Matches/Filter";
import { IMatchProps } from "../components/utils/utils";
import { springSplitDB } from "../firebase";
import { useAppSelector } from "../redux-store/hook";
import Preparing from "./Preparing";
import SpringSplit from "./Seasons/SpringSplit";
import SummerSplit from "./Seasons/SummerSplit";

const Container = styled.div`
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  font-size: 24px;
`;

const Series = styled.div`
  display: flex;
  margin-left: 30px;
`;
const Season = styled.div`
  text-transform: uppercase;
  padding : 5px 16px;
  &:hover {
    color : ${props=> props.theme.textHover};
  }
`;

function Matches() {
  const [spirngSchedules, setSpringSchedules] = useState<IMatchProps[]>();
  const [summerSchedules, setSummerSchedules] = useState<IMatchProps[]>();
  const filter = useAppSelector(state=> state.filter)

  const filteringTeams = (schedules: IMatchProps[]) =>
    filter.includes("all")
      ? schedules
      : schedules?.filter(
          (a) => filter.includes(a.teamA) || filter.includes(a.teamB)
        );

  const playOff = (schedules: IMatchProps[]) =>
    schedules
      ?.filter((a) => a.round > 2)
      .sort((a, b) => {
        if (new Date(a.date) > new Date(b.date)) return 1;
        return -1;
      });

  const getSchedule = async () => {
    const document = await getDoc(springSplitDB);
    if (document.exists()) {
      const matches: IMatchProps[] = document.data().sample;
      setSpringSchedules(matches);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <Container>
      <Filter />
      <Series>
      <Link to="/matches/spring/playoff">
        <Season>Spring</Season>
      </Link>
      <Link to="/matches/summer">
        <Season>Summer</Season>
      </Link>
      </Series>
      <Routes>
        {spirngSchedules === undefined ? (
          <Route path="/spring" element={<Preparing />} />
        ) : (
          <Route
            path="/spring/*"
            element={
              <SpringSplit
                seasonSplitMatchs={filteringTeams(spirngSchedules)}
                playOffMatches={playOff(spirngSchedules)}
              />
            }
          />
        )}
        {summerSchedules === undefined ? (
          <Route path="/summer/*" element={<Preparing />} />
        ) : (
          <Route
            path="/summer"
            element={
              <SummerSplit
                seasonSplitMatchs={filteringTeams(summerSchedules)}
                playOffMatches={playOff(summerSchedules)}
              />
            }
          />
        )}
      </Routes>
    </Container>
  );
}

export default Matches;
