import { DocumentData } from "firebase/firestore";
import styled from "styled-components";

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
  &::after {
    content: "";
    width: 60%;
    height: 2px;
    position: relative;
    bottom: -25px;
    background-color: ${(props) => props.theme.textColor};
  }
`;

const Day = styled.div`
  font-size: 28px;
  text-align: center;
  margin-bottom: 12px;
  & h1 {
  }
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
  left: 40px;
  transform: rotateZ(-5deg);
`;

function Match(data: DocumentData) {
  const d_day = new Date(data.date);
  const month = d_day.getMonth();
  const date = d_day.getDate();
  const time = `${d_day.getHours()}:00`;
  return (
    <Schedule key={data.date} month={month} date={date}>
      {data.tiebreaker ? <Tie>Tie Breaker</Tie> : null}
      <Day>
        {data.round >= 3 ? (
          data.round === 5 ? (
            <h1>FINAL</h1>
          ) : (
            <h1>Play-Off Round{data.round - 2}</h1>
          )
        ) : null}
        <span>{data.scoreA ? null : time}</span>
      </Day>
      <Teams>
        <Team>
          <img
            src={require(`../../images/${data.teamA}.png`)}
            alt={"Team's Icon"}
          />
          <label>{data.teamA}</label>
        </Team>
        {data.scoreA && data.scoreB ? (
          <>
            <Score>
              {data.scoreA} : {data.scoreB}
            </Score>
          </>
        ) : (
          <Versus>VS</Versus>
        )}
        <Team>
          <img
            src={require(`../../images/${data.teamB}.png`)}
            alt={"Team's Icon"}
          />
          <label>{data.teamB}</label>
        </Team>
      </Teams>
    </Schedule>
  );
}

export default Match;
