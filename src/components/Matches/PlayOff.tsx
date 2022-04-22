import styled from "styled-components";
import POmatch from "./POmatch";
import { IMatchProps } from "../utills";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  margin-bottom: 24px;
  font-size: 56px;
  & h2 {
    font-size: 44px;
  }
`;

const Rounds = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;
const Round1 = styled.div``;
const Round2 = styled.div``;
const Finals = styled.div``;

interface IPOprops {
  poTeams: IMatchProps[];
}

function PlayOff({ poTeams }: IPOprops) {
  const round1 = poTeams.filter((a) => a.round === 3);
  const round2 = poTeams.filter((a) => a.round === 4);
  const finals = poTeams.filter((a) => a.round === 5)[0];
  return (
    <Container>
      <Title>
        <h2>2022 {'SPRING'}</h2>PLAYOFFS
      </Title>
      <Rounds>
        <Round1>
          {round1.map((match) => (
            <POmatch key={match.date} {...match}/>
          ))}
        </Round1>
        <Round2>
          {round2.map((match) => (
            <POmatch key={match.date} {...match}/>
          ))}
        </Round2>
        <Finals><POmatch {...finals}/></Finals>
      </Rounds>
    </Container>
  );
}

export default PlayOff;
