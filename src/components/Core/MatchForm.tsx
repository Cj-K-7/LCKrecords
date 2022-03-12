import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { que } from "../../firebase";
import { teams } from "../utills";

const Match = styled.form`
  width: 600px;
`;
const Title = styled.div`
  font-size : 20px;
  margin-top: 20px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
const Buttons = styled.div``;

interface IMatchProps {
  round: number;
  date: string;
  teamA: string;
  teamB: string;
  isDone: number;
}

interface IFormProps {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
}

function MatchForm({ round, date, teamA, teamB, isDone }: IMatchProps) {
  const [A, setA] = useState(teamA);
  const [B, setB] = useState(teamB);
  const { register, handleSubmit } = useForm<IFormProps>();
  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { id, value },
    } = event;
    return id === "teamA" ? setA(value) : setB(value);
  };
  const onSubmit = async (data: IFormProps) => {
    if (data.scoreA === data.scoreB || data.scoreA + data.scoreB === 1) {
      alert("check score");
      return;
    }
    await updateDoc(que, { sample : arrayUnion({
      date,
      round,  
      isDone: true,
      teamA,
      scoreA: data.scoreA,
      teamB,
      scoreB: data.scoreB,
     })
    });
    await updateDoc(que, { sample : arrayRemove({
      date,
      round,  
      isDone,
      teamA,
      teamB,
     })
    });
  };

  return (
    <>
      {!isDone ? (
        <div>
          <Title>
            {date} / Round :{round}
          </Title>
          <Match onSubmit={handleSubmit(onSubmit)}>
            <Grid>
              <Team>
                <img src={require(`../../images/${A}.png`)} alt={"Team's Icon"} />
                <TeamName
                  id="teamA"
                  value={A}
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
                  value={B}
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
                <img src={require(`../../images/${B}.png`)} alt={"Team's Icon"} />
              </Team>
              <Buttons>
                <input type="submit" value="✅" />
              </Buttons>
            </Grid>
          </Match>
        </div>
      ) : null}
    </>
  );
}

export default MatchForm;
