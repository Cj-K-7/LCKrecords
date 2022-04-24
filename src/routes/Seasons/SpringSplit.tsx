import { useState } from "react";
import styled from "styled-components"
import Loader from "../../components/Layouts/Loader";
import Last from "../../components/Matches/Last";
import PlayOff from "../../components/Matches/PlayOff";
import Upcoming from "../../components/Matches/Upcoming";
import { ISplitProps } from "../../components/utils/utils";

const Tab = styled.div`
  margin: 10px;
  padding-top: 28px;
  font-size: 26px;
  text-decoration: underline;
  text-align: center;
  &:hover {
    color : ${props=> props.theme.textHover};
  }
`;

function SpringSplit({seasonSplitMatchs, playOffMatches}: ISplitProps) {
    const [toggle, setToggle] = useState(false);

  const upcomings = seasonSplitMatchs
    ?.sort((pre, next) => {
      if (new Date(pre.date) > new Date(next.date)) return 1;
      return -1;
    })
    .filter((match) => +new Date(match.date) >= +new Date() - 10800000);

  const lasts = seasonSplitMatchs
    ?.sort((pre, next) => {
      if (new Date(pre.date) > new Date(next.date)) return 1;
      return -1;
    })
    .filter((match) => +new Date(match.date) < +new Date() - 10800000);

  return (
    <>
        {playOffMatches.length > 0 ?
            <PlayOff poTeams={playOffMatches}/> : null
          }
            {seasonSplitMatchs ? (
              <>
                <Upcoming upcoming={upcomings} />
                <Tab onClick={() => setToggle((pre) => !pre)}>
                  {toggle ? "Hide Last Matches▲" : "See Last matches ▼"}
                </Tab>
                {toggle ? <Last last={lasts} /> : null}
              </>
            ) : (
              <Loader />
            )}
    </>
  )
}

export default SpringSplit