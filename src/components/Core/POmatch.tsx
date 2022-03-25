import styled from "styled-components";
import { IMatchProps, monthDay } from "../utills";

const Schedule = styled.div<{ month: number; date: number }>`
  position: relative;
  display: flex;
  min-width: 300px;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding-top: 20px;
  padding-bottom: 25px;
  ${(props) =>
    props.month === new Date().getMonth() && props.date === new Date().getDate()
      ? `   background-image: linear-gradient(
            120deg,
            rgb(75, 69, 184),
            5%,
            transparent 50%
            );`
      : ``}
  &:hover {
    background-image: linear-gradient(
      120deg,
      rgb(204, 59, 45),
      5%,
      transparent 50%
    );
  }
`;

const Day = styled.div`
  font-size: 36px;
  text-align: center;
  margin-bottom: 12px;
  & h2 {
      margin-top: 12px;
    font-size: 28px;
}
`;
const Teams = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Team = styled.div`
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
& h1 {
    font-size: 36px;
}
  & img {
    margin-bottom: 12px;
    width: 70px;
    height: 70px;
    margin-right: 16px;
  }
`;
const Score = styled.div`
  width: 100px;
  height: 35px;
  font-size: 35px;
  text-align: center;
  margin: 16px;
`;
const Versus = styled.div`
  margin: 0px 24px;
  padding-bottom: 12px;
`;
const Tie = styled.div`
  position: absolute;
  top: 15px;
  left: 40%;
  transform: rotateZ(-5deg);
`;

function POmatch(data: IMatchProps) {
  const d_day = new Date(data.date);
  const month = d_day.getMonth();
  const date = d_day.getDate();
  const time = `${d_day.getHours()}:00`;
  return (
    <Schedule key={data.date} month={month} date={date}>
      <Day>
        {data.round === 5 ? (
          <h1>FINAL</h1>
        ) : (
          <h1>Round{data.round - 2} | Bo5</h1>
        )}
        <h2>{monthDay(data.date)}  {time}</h2>
      </Day>
      <Teams>
        <Team>
          <img
            src={require(`../../images/${data.teamA}_reverse.png`)}
            alt={"Team's Icon"}
          />
          <h1>{data.teamA}</h1>
          {data.scoreA ? <Score>{data.scoreA}</Score> : null}
        </Team>
        <Team>
          <img
            src={require(`../../images/${data.teamB}_reverse.png`)}
            alt={"Team's Icon"}
          />
          <h1>{data.teamB}</h1>
          {data.scoreB ? <Score>{data.scoreB}</Score> : null}
        </Team>
      </Teams>
    </Schedule>
  );
}

export default POmatch;
