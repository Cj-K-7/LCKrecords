import { useDispatch, useSelector } from "react-redux";
import { add, remove, RootState } from "../../store";
import styled from "styled-components";
import { teams } from "../utills";
import { motion } from "framer-motion";

const Box = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 10%;
  height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: ${(props) => props.theme.modalTextColor};
  background-color: ${(props) => props.theme.modalColor};
  box-shadow: -3px 3px 3px rgba(30, 30, 30, 0.6);
  z-index: 2;
  &::before {
    content: "FILTER";
    position: absolute;
    top: 20%;
    left: -40px;
    writing-mode: vertical-lr;
    border-radius: 20px 0px 0px 20px;
    padding: 10px;
    color: ${(props) => props.theme.modalTextColor};
    background-color: ${(props) => props.theme.modalColor};
    box-shadow: -3px 3px 3px rgba(30, 30, 30, 0.6);
  }
  & p {
    display: flex;
    font-size: 20px;
    width: 50px;
    min-height: 50px;
    box-shadow: 1px 1px 1px rgba(30, 30, 30, 0.2);
    text-align: center;
    align-items: center;
    opacity: 0.3;
  }
`;

const Team = styled.label`
  padding: 10px 0px;
  & input[type="checkbox"] {
    display: none;
  }
  & input[type="checkbox"]:checked + img {
    opacity: 1;
  }
  & input[type="checkbox"]:checked + p {
    opacity: 1;
    box-shadow: inset 1px 1px 1px rgba(30, 30, 30, 0.2);
  }
`;

const IMG = styled.img`
  width: 50px;
  height: 50px;
  opacity: 0.3;
`;

const variant = {
  hidden: { x: 80, opacity: 1 },
  hover: { x: 0, opacity: 0.8 },
};

function Filter() {
  const filter = useSelector((state: RootState) => state.filter);
  const onChecking = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value, checked },
    } = event;
    if (!checked && filter.includes(value)) dispatch(remove(value));
    else dispatch(add(value));
  };

  const dispatch = useDispatch();

  return (
    <Box variants={variant} initial="hidden" whileHover="hover">
      <Team>
        <input
          type="checkbox"
          name="all"
          value="all"
          defaultChecked
          onChange={onChecking}
        />
        <p>ALL</p>
      </Team>
      {teams.map((team) => (
        <Team>
          <input
            type="checkbox"
            name={team}
            value={team}
            onChange={onChecking}
          />
          <IMG
            id={team}
            src={require(`../../images/${team}_reverse.png`)}
            alt={"Team's Icon"}
          />
        </Team>
      ))}
    </Box>
  );
}

export default Filter;
