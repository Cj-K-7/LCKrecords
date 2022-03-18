import { DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LeaderBoard from "../components/Core/LeaderBoard";
import { Faceboock, Instagram, Tweet, Twitch } from "../components/SVGs";
import { autoStandings, IMatchProps, teams } from "../components/utills";
import { que } from "../firebase";

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 100px;
  @media (max-width:1200px) {
    flex-direction: column ;
    align-items: center ;
  }
`;
const Sub = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 30px;
  h1 {
    margin: 20px;
    font-size: 32px;
  }
`;
const LCK_LIVE = styled.div`
  min-width: 1080px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 38px;
    margin: 36px;
  }
`;
const LCK_TV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SNS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div{
    height: 310px;
  display: flex;
  align-items: center;
  }
  svg {
    margin: 20px;
    width: 120px;
    height: 120px;
    fill: ${(props) => props.theme.textColor};
    &:first-child:hover {
      fill: rgb(42, 169, 224);
    }
    &:nth-child(2):hover {
      fill: url("#facebook");
    }
    &:nth-child(3):hover {
      fill: url("#instagram");
    }
    &:nth-child(4):hover {
      fill: rgb(169, 112, 255);
    }
  }
`;

function Home() {
  const [standing, setStanding] = useState<DocumentData[]>();
  const getData = async () => {
    const document = await getDoc(que);
    //const cache = await getDocsFromCache(que); // 오프라인 캐시 사용
    if(document.exists()){
      const matches : IMatchProps[] = document.data().sample;
      const convertingArr = 
      matches.filter((a) => a.isDone);
      const sortedResults = teams
      .map((a) => autoStandings(convertingArr, a))
      .sort((a, b) => {
        const Apoint = a.scoreWin - a.scoreLose;
        const Bpoint = b.scoreWin - b.scoreLose;
        if (a.win < b.win) return 1;
        if (a.win > b.win) return -1;
        if (a.win === b.win) {
          if (Apoint < Bpoint) return 1;
          if (Apoint > Bpoint) return -1;
          return 0;
        }
        return 0;
      });
      setStanding(sortedResults);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Main>
        <LCK_LIVE>
          <h1>LCK LIVE</h1>
          <iframe
            title="LCKLIVE"
            width="1080"
            height="607.5"
            src="https://player.twitch.tv/?channel=lck_korea&parent=cj-k-7.github.io&autoplay=true"
            allowFullScreen
          ></iframe>
        </LCK_LIVE>
        {/* <LeaderBoard standings={standing} /> */}
      </Main>
      <Sub>
        <LCK_TV>
          <h1>LCK YOUTUBE</h1>
          <iframe
            title="LCKYOUTUBE"
            width="550"
            height="310"
            src={`https://www.youtube.com/embed?listType=playlist&list=UUw1DsweY9b2AKGjV4kGJP1A&index=1`}
            allowFullScreen
          />
        </LCK_TV>
        <SNS>
          <h1>LCK SNS & CONTENTS</h1>
          <div>
            <Tweet/>
            <Faceboock/>
            <Instagram/>
            <Twitch/>
          </div>
        </SNS>
      </Sub>
    </Container>
  );
}

export default Home;
