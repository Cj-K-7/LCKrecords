import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Match from "../Core/Match";
import Loader from "../Layouts/Loader";
import { groupbyDay, monthDay } from "../utills";

const Box = styled(motion.div)`
  transform-origin: top;
`;
const Grid = styled(motion.div)`
  width: 100vw;
  max-height: 380px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: auto;
  grid-row-gap: 16px;
  justify-content: center;
  align-items: flex-start;
  & h1 {
    text-align: center;
  }
`;
const Title = styled.h1`
  font-size: 30px;
  padding: 30px;
  margin: 20px 25px;
  margin-top: 0px;
`;

const Div = styled(motion.div)`
  margin-bottom: 40px;
`
const Day = styled.h1`
  font-size: 30px;
`;

interface ILastProps {
  last: DocumentData[] | undefined;
}

const variants = {
  hidden: { y: -200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    y: -200,
    opacity: 0,
  },
};

const parent = {
  hidden: { opacity : 0 },
  visible: {
    opacity: 1,
    transition: {
      delay : 1,
      delayChildren: 1.3,
    },
  },
};

const child = {
  hidden: { y : -100, opacity: 0 },
  visible: {
    y : 0,
    opacity: 1,
  },
};

function Last({ last }: ILastProps) {
  const refs = document.getElementsByClassName(`match`);
  const grouped = groupbyDay(last ? last : []);
  const keys = Object.keys(grouped);
  useEffect(()=>{
    refs.item(refs.length-1)?.scrollIntoView();
  },[])

  return (
    <Box variants={variants} initial="hidden" animate="visible" exit="exit">
      <Title> Last Matches </Title>
      {last ? (
        <Grid id='grid' variants={parent} initial="hidden" animate="visible">
          {keys.map((key, i) => (
            <Div variants={child} className="match" key={i}>
              <Day>{key}</Day>
              {grouped[key].map((data, i) => (
                <Match key ={i} {...data} />
              ))}
            </Div>
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default Last;
