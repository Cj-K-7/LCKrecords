import { DocumentData } from "firebase/firestore";
import { motion } from "framer-motion";
import styled from "styled-components";
import Match from "./Match";
import Loader from "../Layouts/Loader";
import { monthDay } from "../utils/utils";

const Box = styled(motion.div)`
  margin-bottom: 50px;
`;
const Grid = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  align-items: center;
`;
const Title = styled(motion.h1)`
  font-size: 30px;
  padding: 30px;
  margin: 20px 25px;
`;
const Date = styled.h1`
  text-align: center;
  font-size: 28px;
`;

const parent = {
  hidden: { y: -100, opacity: 0.4 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const child = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

interface IUpcomingProps {
  upcoming: DocumentData[] | undefined;
}

function Upcoming({ upcoming }: IUpcomingProps) {
  return (
    <Box variants={parent} initial="hidden" animate="visible">
      <Title variants={child}> UPCOMING SCHDULE </Title>
      {upcoming ? (
        upcoming.length === 0 ? (
          <Date>No Upcoming Matches</Date>
        ) : (
          <Grid>
            {upcoming.map((d, i) => (
              <motion.div key={i} variants={child}>
                <Date>{monthDay(d.date)}</Date>
                <Match {...d} />
              </motion.div>
            ))}
          </Grid>
        )
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default Upcoming;
