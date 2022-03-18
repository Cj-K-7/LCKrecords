import { DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {Route, Routes} from "react-router-dom"
import styled from "styled-components";
import Match from "../components/Core/Match";
import Loader from "../components/Layouts/Loader";
import Upcoming from "../components/Matches/Upcoming";
import { IMatchProps } from "../components/utills";
import { que } from "../firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
`;

function Matches() {

  return (
    <Container>
      <Routes>
        <Route path="/:upcoming">
          <Upcoming/>
        </Route>
        <Route path="/:last">

        </Route>
      </Routes>
    </Container>
  );
}

export default Matches;
