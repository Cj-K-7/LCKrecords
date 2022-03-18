import { DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { que } from "../../firebase";
import Match from "../Core/Match";
import Loader from "../Layouts/Loader";
import { IMatchProps } from "../utills";

const Grid = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 30px;
  padding: 30px;
  margin: 20px 25px;
`;

function Upcoming() {
    const [upcoming, setUpcoming] = useState<DocumentData[]>();
    const getSchedule = async () => {
      const document = await getDoc(que);
      if (document.exists()) {
        const matches : IMatchProps[] = document.data().sample 
        setUpcoming(
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
    <>
      <Title> UPCOMING SCHDULE </Title>
      {upcoming ? (
        <Grid>
          {upcoming.map((d) => (
            <Match {...d} />
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Upcoming;
