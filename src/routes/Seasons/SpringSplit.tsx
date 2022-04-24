import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../components/Layouts/Loader";
import Last from "../../components/Matches/Last";
import PlayOff from "../../components/Matches/PlayOff";
import Upcoming from "../../components/Matches/Upcoming";
import { ISplitProps } from "../../components/utils/utils";
import Preparing from "../Preparing";

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

const Submenu = styled.div`
  margin-top: 20px;
  margin-left: 30px;
  & a {
    padding: 20px;
  }
`;

function SpringSplit({ seasonSplitMatchs, playOffMatches }: ISplitProps) {
  const [toggle, setToggle] = useState(true);
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
      <Submenu>
        <Link to="/matches/spring/league">League</Link>
        <Link to="/matches/spring/playoff">Play Off</Link>
      </Submenu>
      <Routes>
        <Route
          path="/playoff"
          element={
            playOffMatches.length > 0 ? (
              <PlayOff poTeams={playOffMatches} />
            ) : (
              <Preparing />
            )
          }
        />
        <Route
          path="/league"
          element={
            seasonSplitMatchs ? (
              <>
                <Upcoming upcoming={upcomings} />
                <Tab onClick={() => setToggle((pre) => !pre)}>
                  {toggle ? "Hide Last Matches▲" : "See Last matches ▼"}
                </Tab>
                {toggle ? <Last last={lasts} /> : null}
              </>
            ) : (
              <Loader />
            )
          }
        />
      </Routes>
    </>
  );
}

export default SpringSplit;
