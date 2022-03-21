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

export const monthDay = (date: string) => {
  return `${new Date(date).getMonth() + 1}.${new Date(date).getDate()}`;
};

export const groupbyDay = (arr: DocumentData[]) => {
  return arr.reduce((a, c) => {
    const key = monthDay(c.date);
    if (!a[key]) {
      a[key] = [];
    }
    a[key].push(c);
    return a;
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
