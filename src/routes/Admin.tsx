import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { database } from "../firebase";

export interface IdataProps {
    name : string;
    match_win: number;
    match_lose: number;
    round_win: number;
    round_lose: number;
}

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function Admin() {
  const { register, handleSubmit } = useForm<IdataProps>();
  const onSubmit = async (data: IdataProps) => {
    await setDoc(doc(database, "DB", "LB","teams",data.name), data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("name", { required: true })}>
        <option value="T1">T1</option>
        <option value="DWG">DWG</option>
        <option value="GEN">GEN</option>
        <option value="HLE">HLE</option>
        <option value="BRO">BRO</option>
        <option value="NS">NS</option>
        <option value="KDF">KDF</option>
        <option value="LSB">LSB</option>
        <option value="KT">KT</option>
        <option value="DRX">DRX</option>
      </select>
      <input {...register("match_win", { required: true })} type="number" />
      <input {...register("match_lose", { required: true })} type="number" />
      <input {...register("round_win", { required: true })} type="number" />
      <input {...register("round_lose", { required: true })} type="number" />
      <input type="submit" value="SUBMIT" />
    </Form>
  );
}

export default Admin;
