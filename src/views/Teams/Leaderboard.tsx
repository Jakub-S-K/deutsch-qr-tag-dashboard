import React, { useState } from "react";
import { Table } from "reactstrap";
import { isResponse, isTeamArr, Team } from "../../backendTypes";
import { useLoaderData } from "react-router-dom";
import { Retreat } from "../../components/Retreat/Retreat";

export const Leaderboard = () => {
  const names = ["Name", "Points"];
  const data = useLoaderData();
  const [userData] = useState<Team[]>(() => {
    if (isResponse(data) && isTeamArr(data.data)) {
      return data!.data;
    }
    return [];
  });
  return (
    <div className="row py-3">
      <div className="col col-12">
        <Retreat />
      </div>
      <Table striped>
        <thead>
          <tr>
            {names.map((value, index) => (
              <th key={index + "-" + value}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData.map((user: Team, index: number) => (
            <tr key={index + "-r"}>
              <td key={index + "-name"}>{user.name}</td>
              <td>{10 - index}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
