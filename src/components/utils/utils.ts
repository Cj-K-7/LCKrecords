import { DocumentData } from "firebase/firestore";

export const teams = [
  "T1",
  "DK",
  "GEN",
  "HLE",
  "BRO",
  "NS",
  "KDF",
  "LSB",
  "KT",
  "DRX",
];

export const autoStandings = (arr: DocumentData[], team: string) => {
  return arr.reduce(
    (acc, obj) => {
      if (obj["teamA"] === team) {
        acc.scoreWin += +obj["scoreA"];
        acc.scoreLose += +obj["scoreB"];
        if (obj["scoreA"] > obj["scoreB"]) {
          acc.win++;
        } else {
          acc.lose++;
        }
      } else if (obj["teamB"] === team) {
        acc.scoreWin += +obj["scoreB"];
        acc.scoreLose += +obj["scoreA"];
        if (obj["scoreB"] > obj["scoreA"]) {
          acc.win++;
        } else {
          acc.lose++;
        }
      }
      return acc;
    },
    { team, win: 0, lose: 0, scoreWin: 0, scoreLose: 0 }
  );
};

export interface groupbyDayProps {
  [date: string]: IMatchProps[];
}

const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

export const monthDay = (date: string) => {
  const mm = new Date(date).getMonth();
  const dd = new Date(date).getDate();
  const weekDay = day[new Date(date).getDay()];
  return `${mm + 1}.${dd} ${weekDay}`;
};

export const groupbyDay = (arr: DocumentData[]) => {
  return arr.reduce((acc, cur) => {
    const key = monthDay(cur.date);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(cur);
    return acc;
  }, {}) as groupbyDayProps;
};

export interface IMatchProps {
  date: string;
  round: number;
  isDone: boolean;
  teamA: string;
  scoreA: string | undefined;
  teamB: string;
  scoreB: string | undefined;
  tiebreaker: boolean | undefined;
}

export interface ISplitProps{
  seasonSplitMatchs : IMatchProps[],
  playOffMatches : IMatchProps[]
}