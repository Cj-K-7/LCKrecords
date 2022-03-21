import { DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Filter from "../components/Core/Filter";
import Loader from "../components/Layouts/Loader";
import Last from "../components/Matches/Last";
import Upcoming from "../components/Matches/Upcoming";
import { IMatchProps } from "../components/utills";
import { que } from "../firebase";
import { RootState } from "../store";

const Container = styled.div`
  width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
`;

const Tab = styled.div`
  margin: 10px;
`;

function Matches() {
  const [schedules, setSchedules] = useState<DocumentData[]>();
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

  return (
    <Container>
      <Filter/>
      {schedules ? (
        <>
          <Upcoming upcoming={upcoming} />
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
