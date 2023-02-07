import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import {
  isOnlineInTeamArr,
  isResponse,
  isTeamArr,
  OnlineInTeam,
  Team,
} from "../../backendTypes";
import { useLoaderData } from "react-router-dom";
import { Retreat } from "../../components/Retreat/Retreat";
import { getLiveUsers } from "../../utilities";
import Icon from "@mdi/react";
import { mdiAccountMultiple, mdiCircleSmall } from "@mdi/js";

export const Leaderboard = () => {
  const names = ["Online", "Name", "Points"];
  const data = useLoaderData();
  const [userData] = useState<Team[]>(() => {
    if (isResponse(data) && isTeamArr(data.data)) {
      return data!.data;
    }
    return [];
  });
  const [live, setLive] = useState<OnlineInTeam[]>([]);
  useEffect(() => {
    async function updateOnline() {
      const users = await getLiveUsers();
      if (isResponse(users) && isOnlineInTeamArr(users.data)) {
        setLive(users.data);
      }
    }
    updateOnline();
    let refresh = setInterval(() => {
      updateOnline();
    }, 5000);
    return () => {
      clearInterval(refresh);
    };
  }, []);
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
              <td>
                <Icon
                  path={mdiCircleSmall}
                  size={2}
                  color={
                    live.find((value) => value._id === user._id)?.count === 0
                      ? "red"
                      : "green"
                  }
                />
                {live.find((value) => value._id === user._id)?.count}/
                {user.members.length}
                <Icon path={mdiAccountMultiple} size={1} />
              </td>
              <td key={index + "-name"}>{user.name}</td>
              <td>{10 - index}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
