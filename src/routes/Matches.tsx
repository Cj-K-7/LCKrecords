import { DocumentData, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../components/Layouts/Loader";
import Last from "../components/Matches/Last";
import Upcoming from "../components/Matches/Upcoming";
import { IMatchProps } from "../components/utills";
import { que } from "../firebase";
import { add, RootState } from "../store";

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
  const dispatch = useDispatch();
  const onChecking = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    dispatch(add(value));
  };
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
 

  const upcoming = schedules
    ?.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return 1;
      return -1;
    })
    .filter((a) => +new Date(a.date) >= +new Date() - 10800000);

  const last = schedules
    ?.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return 1;
      return -1;
    })
    .filter((a) => +new Date(a.date) < +new Date() - 10800000);
  
  return (
    <Container>
      {/* <input type="checkbox" value="T1" defaultChecked onChange={onChecking} /> */}
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
