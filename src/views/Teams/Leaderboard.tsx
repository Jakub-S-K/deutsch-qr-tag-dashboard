import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import {
  isOnlineInTeamArr,
  isResponse,
  OnlineInTeam,
} from "../../backendTypes";
import { getLiveUsers } from "../../utilities";
import Icon from "@mdi/react";
import { mdiAccountMultiple, mdiCircleSmall } from "@mdi/js";

export const Leaderboard = () => {
  const names = ["Online", "Name", "Points"];
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
      <Table striped>
        <thead>
          <tr>
            {names.map((value, index) => (
              <th key={index + "-" + value}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {live.map((team: OnlineInTeam, index: number) => (
            <tr key={index + "-r"}>
              <td>
                <Icon
                  path={mdiCircleSmall}
                  size={2}
                  color={
                    live.find((value) => value._id === team._id)?.count === 0
                      ? "red"
                      : "green"
                  }
                />
                {team.count}/
                {team.membersCount}
                <Icon path={mdiAccountMultiple} size={1} />
              </td>
              <td key={index + "-name"}>{team.team}</td>
              <td>{10 - index}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
