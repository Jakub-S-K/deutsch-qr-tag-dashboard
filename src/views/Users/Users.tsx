import React from "react";
import { Button, Table } from "reactstrap";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { User } from "../../backendTypes";
import { useLoaderData, useNavigate } from "react-router-dom";

export const Users = () => {
  const names = ["id", "Name", "Surname", "Actions"];
  const navigate = useNavigate();
  const userData: any = useLoaderData();
  return (
    <Table striped>
      <thead>
        <tr>
          {names.map((value, index) => (
            <th key={index + "-" + value}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {userData.map((user: User, index: number) => (
          <tr key={index + "-r"}>
            <td key={index + "-id"}>{user._id}</td>
            <td key={index + "-name"}>{user.name}</td>
            <td key={index + "-surname"}>{user.surname}</td>
            <td>
              <Button
                color="warning"
                className="mx-2"
                onClick={() => navigate(`/users/${user._id}`)}
              >
                <Icon path={mdiPencil} title="Edit" size={0.75} color="black" />
              </Button>
              <Button color="danger">
                <Icon
                  path={mdiDelete}
                  title="Delete"
                  size={0.75}
                  color="black"
                />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
