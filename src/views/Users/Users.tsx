import React from "react";
import { Button, Table } from "reactstrap";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { User } from "../../backendTypes";
import { useLoaderData } from "react-router-dom";

export const Users = () => {
  const names = ["id", "Name", "Surname", "Actions"];
  const userData: any = useLoaderData();
  return (
    <Table striped>
      <thead>
        {names.map((value) => (
          <th>{value}</th>
        ))}
      </thead>
      <tbody>
        {userData.map((user: User) => (
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>
              <Button color="warning" className="mx-2">
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
