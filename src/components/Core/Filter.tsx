import { useDispatch, useSelector } from "react-redux";
import { add, remove, RootState } from "../../store";
import styled from "styled-components";
import { teams } from "../utills";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Box = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 10%;
  width:  fit-content;
  height: fit-content;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat( 2, 1fr );
  grid-template-rows: repeat( 5, 1fr );
  border-radius: 20px;
  color: ${(props) => props.theme.modalTextColor};
  background-color: ${(props) => props.theme.modalColor};
  box-shadow: -3px 3px 3px rgba(30, 30, 30, 0.6);
  transition: 0.83s;
  z-index: 2;
  &::before {
    content: "FILTER";
    position: absolute;
    top: 20%;
    left: -30px;
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
    width: 120px;
    height: 50px;
    box-shadow: 1px 1px 1px rgba(30, 30, 30, 0.2);
    justify-content: center;
    align-items: center;
    opacity: 0.3;
  }
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

const Team = styled.label`
  padding: 10px;
`;

const IMG = styled.img`
  width: 50px;
  height: 50px;
  opacity: 0.3;
`;

function Filter() {
  const [clicked, setClicked] = useState(false);
  const [x, setX] = useState(160);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const onChecking = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value, checked },
    } = event;
    if (!checked && filter.includes(value)) dispatch(remove(value));
    else dispatch(add(value));
  };
  const onClick = () => {
    setClicked((pre) => !pre);
    clicked ? setX(0) : setX(160);
  };

  return (
    <Box style={{ x }} onClick={onClick}>
      {teams.map((team) => (
        <Team>
          <input
            type="checkbox"
            name={team}
            value={team}
            defaultChecked={ filter.includes(team) }
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
