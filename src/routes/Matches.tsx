import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Filter from "../components/Core/Filter";
import Loader from "../components/Layouts/Loader";
import Last from "../components/Matches/Last";
import PlayOff from "../components/Matches/PlayOff";
import Upcoming from "../components/Matches/Upcoming";
import { IMatchProps } from "../components/utills";
import { que } from "../firebase";
import { RootState } from "../store";

const Container = styled.div`
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  font-size: 24px;
`;

const Tab = styled.div`
  margin: 10px;
  padding-top: 28px;
  font-size: 26px;
  text-decoration: underline;
  text-align: center;
  &:hover {
    color : ${props=> props.theme.textHover};
  }
`;

const Border = styled.div`
width: 100%;
height: 40px;
  background-image: linear-gradient(to right, #ffffff 33%, rgba(255,255,255,0) 0%);
background-position: bottom;
background-size: 80px 1px;
background-repeat: repeat-x;
`

function Matches() {
  const [schedules, setSchedules] = useState<IMatchProps[]>();
  const [toggle, setToggle] = useState(false);
  const filter = useSelector((state: RootState) => state.filter);

  const getSchedule = async () => {
    const document = await getDoc(que);
    if (document.exists()) {
      const matches: IMatchProps[] = document.data().sample;
      setSchedules(matches);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  const filterd = filter.includes("all")
    ? schedules
    : schedules?.filter(
        (a) => filter.includes(a.teamA) || filter.includes(a.teamB)
      );

  const upcoming = filterd
    ?.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return 1;
      return -1;
    })
    .filter((a) => +new Date(a.date) >= +new Date() - 10800000);

  const last = filterd
    ?.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return 1;
      return -1;
    })
    .filter((a) => +new Date(a.date) < +new Date() - 10800000);

  const playOff = schedules?.filter(a=>a.round > 2).sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) return 1;
    return -1;
  })

  return (
    <Container>
      <Filter/>
      {playOff ?
      <PlayOff poTeams={playOff}/> : null
    }
    <Border/>
      {schedules ? (
        <>
          <Upcoming upcoming={upcoming} />
        <Border/>
          <Tab onClick={() => setToggle((pre) => !pre)}>
            {toggle ? "Hide Last Matches▲" : "See Last matches ▼"}
          </Tab>
          {toggle ? <Last last={last} /> : null}
        </>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default Matches;
