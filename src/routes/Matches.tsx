import { DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../components/Layouts/Loader";
import { IMatchProps } from "../components/utills";
import { que } from "../firebase";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  h1 {
    font-size: 30px;
    padding: 0px 16px;
    padding-bottom: 12px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const Title = styled.h1`
  font-size: 30px;
  padding: 30px;
  margin: 20px 0px;
`;

const Schedule = styled.div`
  display: flex;
  min-width: 200px;
  flex-direction: column;
  padding-bottom: 30px;
  border-bottom: 2px solid ${(props) => props.theme.textColor};
  margin-bottom: 30px;
  &:nth-child(1) {
    background-image: linear-gradient(
      145deg,
      rgb(75, 69, 184),
      10%,
      transparent 50%
    );
  }
  &:nth-child(2) {
    background-image: linear-gradient(
      145deg,
      rgb(75, 69, 184),
      10%,
      transparent 50%
    );
  }
`;
const Day = styled.div`
  text-align: center;
  margin-bottom: 12px;
`;
const Teams = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Team = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  img {
    margin-bottom: 12px;
    width: 65px;
    height: 65px;
  }
`;
const Versus = styled.div`
  margin: 0px 24px;
  padding-bottom: 12px;
`;

function Matches() {
  const [schdules, setSchedules] = useState<DocumentData[]>();
  const getSchedule = async () => {
    const document = await getDoc(que);
    if (document.exists()) {
      const matches : IMatchProps[] = document.data().sample 
      setSchedules(
        matches
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) return 1;
            return -1;
          })
          .filter((a) => +new Date(a.date) >= +new Date() - 10800000)
      );
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);
  return (
    <Container>
      <Title> LCK SPRING SPLIT UPCOMING SCHDULE </Title>
      {schdules ? (
        <Grid>
          {schdules.map((d) => {
              const d_day = new Date(d.date);
              const month = d_day.getMonth();
              const date = d_day.getDate();
              return (
                <Schedule key={d.date}>
                  <Day>
                    <span>
                      {month + 1}.{date}
                    </span>
                  </Day>
                  <Teams>
                    <Team>
                      <img
                        src={require(`../images/${d.teamA}_reverse.png`)}
                        alt={"Team's Icon"}
                      />
                      <label>{d.teamA}</label>
                    </Team>
                    <Versus>VS</Versus>
                    <Team>
                      <img
                        src={require(`../images/${d.teamB}_reverse.png`)}
                        alt={"Team's Icon"}
                      />
                      <label>{d.teamB}</label>
                    </Team>
                  </Teams>
                </Schedule>
              );
            })}
        </Grid>
      ) : (
        <Loader />
      )}
    </Container>
  );
}

export default Matches;
