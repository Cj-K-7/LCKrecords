import { useState } from "react";
import styled from "styled-components";
import Loader from "../../components/Layouts/Loader";
import Last from "../../components/Matches/Last";
import PlayOff from "../../components/Matches/PlayOff";
import Upcoming from "../../components/Matches/Upcoming";
import { ISplitProps } from "../../components/utills";

const Tab = styled.div`
  margin: 10px;
  padding-top: 28px;
  font-size: 26px;
  text-decoration: underline;
  text-align: center;
  &:hover {
    color: ${(props) => props.theme.textHover};
  }
`;

function SummerSplit({ seasonSplitMatchs, playOffMatches }: ISplitProps) {
  const [toggle, setToggle] = useState(false);

  const upcoming = seasonSplitMatchs
    ?.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return 1;
      return -1;
    })
    .filter((a) => +new Date(a.date) >= +new Date() - 10800000);

  const last = seasonSplitMatchs
    ?.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return 1;
      return -1;
    })
    .filter((a) => +new Date(a.date) < +new Date() - 10800000);

  return (
    <>
      {playOffMatches.length > 0 ? <PlayOff poTeams={playOffMatches} /> : null}

      {seasonSplitMatchs ? (
        <>
          <Upcoming upcoming={upcoming} />

          <Tab onClick={() => setToggle((pre) => !pre)}>
            {toggle ? "Hide Last Matches▲" : "See Last matches ▼"}
          </Tab>
          {toggle ? <Last last={last} /> : null}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default SummerSplit;
