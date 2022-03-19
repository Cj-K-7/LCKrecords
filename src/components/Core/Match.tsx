import { DocumentData } from "firebase/firestore";
import styled from "styled-components";

const Schedule = styled.div<{ month: number; date: number }>`
  display: flex;
  min-width: 300px;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  padding-top: 20px;
  padding-bottom: 30px;
  border-bottom: 2px solid ${(props) => props.theme.textColor};
  margin-bottom: 30px;
  ${(props) =>
    props.month === new Date().getMonth() && props.date === new Date().getDate()
      ? `   background-image: linear-gradient(
            120deg,
            rgb(75, 69, 184),
            5%,
            transparent 50%
            );`
      : ``}
`;

const Day = styled.div`
font-size : 28px;
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

function Match(data: DocumentData) {
  const d_day = new Date(data.date);
  const month = d_day.getMonth();
  const date = d_day.getDate();
  return (
    <Schedule key={data.date} month={month} date={date}>
      <Day>
        <span>
          {month + 1}.{date}
        </span>
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
            <Score>{data.scoreA} : {data.scoreB}</Score>
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
