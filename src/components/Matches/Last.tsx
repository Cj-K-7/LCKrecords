import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import styled from "styled-components";
import Match from "../Core/Match";
import Loader from "../Layouts/Loader";


const Box = styled(motion.div)`
  transform-origin: top;
`;
const Grid = styled.div`
  width: 100vw;
  max-height: 220px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 30px;
  padding: 30px;
  margin: 20px 25px;
`;

interface ILastProps{
    last : DocumentData[] | undefined
}

const variants = {
  hidden: { y : -200, opacity : 0},
  visible: {
    y : 0,
    opacity:1,
    transition : {
      duration : 1,
    }
  },
  exit: {
    y : -200, opacity : 0
  }
};

function Last({last}:ILastProps) {
  return (
    <Box variants={variants} initial="hidden" animate="visible" exit="exit">
      <Title> Last Matches </Title>
      {last ? (
        <Grid>
          {last.map((d) => (
            <Match {...d} />
          ))}
        </Grid>
      ) : (
        <Loader />
      )}
    </Box>
  )
}

export default Last