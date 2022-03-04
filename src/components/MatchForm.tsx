import { useState } from "react";
import styled from "styled-components";

const Match = styled.form`
width: 600px;
`;
const Grid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
div {
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
const Team = styled.div`
padding: 20px;
img {
  width: 60px;
  height: 60px;
  padding: 0px 5px;
}
`;
const TeamName = styled.select`
width: 140px;
font-size: 28px;
color: ${(props) => props.theme.textColor};
background-color: transparent;
option {
  color: inherit;
  background-color: ${(props) => props.theme.backgroundColor};
}
`;
const ControlBox = styled.div``;
const TeamScore = styled.input.attrs({ type: "number" })`
font-size: 28px;
text-align: center;
color: ${(props) => props.theme.textColor};
background-color: transparent;
`;

interface IMatchProps {
    round: number;
    date: string;
    teamA: string;
    teamB: string;
  }

interface IFormProps {
    teamA: string;
    teamB: string;
    scoreA: string;
    scoreB: string;
  }


const teams = ["T1","DK","GEN","HLE","BRO","NS","KDF","LSB","KT","DRX"];

function MatchForm( match:IMatchProps ) {
    const [teamA, setTeamA] = useState(match.teamA);
    const [teamB, setTeamB] = useState(match.teamB);
    const { register, handleSubmit, setError } = useForm<IFormProps>();
    const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const {
          currentTarget: { id, value },
        } = event;
        return id === "teamA" ? setTeamA(value) : setTeamB(value);
      };
      const onSubmit = async (data: IFormProps) => {};

  return (
    <Match onSubmit={handleSubmit(onSubmit)}>
    <Grid>
      <Team>
        <img
          src={require(`../images/${teamA}.png`)}
          alt={"Team's Icon"}
        />
        <TeamName
          id="teamA"
          value={teamA}
          {...register("teamA", {
            onChange: onChange,
            required: true,
          })}
        >
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </TeamName>
      </Team>
      <ControlBox>
        <TeamScore
          defaultValue={0}
          min={0}
          max={2}
          {...register("scoreA", { required: true })}
        />
        -
        <TeamScore
          defaultValue={0}
          min={0}
          max={2}
          {...register("scoreB", { required: true })}
        />
      </ControlBox>
      <Team>
        <TeamName
          id="teamB"
          value={teamB}
          {...register("teamB", {
            onChange: onChange,
            required: true,
          })}
        >
          {teams.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </TeamName>
        <img
          src={require(`../images/${teamB}.png`)}
          alt={"Team's Icon"}
        />
      </Team>
    </Grid>
  </Match>
  )
}

export default MatchForm