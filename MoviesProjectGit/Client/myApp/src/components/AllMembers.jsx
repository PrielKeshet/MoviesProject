import React from "react";
import { useSelector } from "react-redux";
import SingleMember from "./SingleMember";

export default function AllMembers() {
  const members = useSelector((state) => state.members);

  return (
    <>
      <h1>All Members</h1>

      <br />
      {members?.map((item) => {
        return <SingleMember key={item._id} member={item} />;
      })}
      {members?.length === 0 && <h3>we're sorry, no members found</h3>}
    </>
  );
}
