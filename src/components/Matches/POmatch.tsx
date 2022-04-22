import styled from "styled-components";
import { IMatchProps, monthDay } from "../utills";

const Schedule = styled.div<{ month: number; date: number }>`
  min-width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding: 20px 30px;
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
      140deg,
      rgb(45, 119, 204),
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
const Teams = styled.div<{ round: number }>`
  display: flex;
  flex-direction: ${(props) => (props.round === 5 ? "row" : "column")};
  justify-content: center;
  align-items: flex-start;
`;
const Team = styled.div<{ round: number }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  ${(props) =>
    props.round === 5
      ? ` 
      margin-top: 30px; 
      width : 150px;
      display: flex;
   flex-direction: column;
  align-items: center;
  justify-items: center;`
      : `  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  align-items: center;
  justify-content: flex-start;`}
  & h1 {
    ${(props) =>
      props.round === 5
        ? `width: 140px; text-align: center;
    font-size: 48px;
`
        : `text-align: left;
    font-size: 36px;`}
  }
  & img {
    ${(props) =>
      props.round === 5
        ? `    width: 100px;
    height: 100px;
`
        : `    width: 70px;
    height: 70px;
    margin-right: 16px;`}
  }
`;
const Score = styled.div`
  width: 100px;
  height: 35px;
  font-size: 35px;
  justify-self: flex-end;
  text-align: center;
  margin: 16px;
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
          <h1 style={{fontSize : 60}}>FINALS</h1>
        ) : (
          <h1>Round{data.round - 2} | Bo5</h1>
        )}
        <h2>
          {monthDay(data.date)} {time}
        </h2>
      </Day>
      <Teams round={data.round}>
        <Team round={data.round}>
          <img
            src={require(`../../images/${data.teamA}_reverse.png`)}
            alt={"Team's Icon"}
          />
          <h1>{data.teamA}</h1>
          {data.scoreA ? <Score>{data.scoreA}</Score> : null}
        </Team>
        <Team round={data.round}>
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
