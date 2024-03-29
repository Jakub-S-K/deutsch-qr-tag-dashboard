import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { isResponse, isUserArr, User } from "../../backendTypes";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Confirm } from "../../components/Confirm/Confirm";

type ModalProps = {
  isOpen: boolean;
  name: string;
  surname: string;
  _id: string;
} & User;

export const Users = () => {
  const names = ["id", "Imię", "Nazwisko", "Akcje"];
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    name: "",
    surname: "",
    _id: "",
  });
  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
  };
  const setUser = (user: User) => {
    setModal({ ...modal, isOpen: !modal.isOpen, ...user });
  };
  const navigate = useNavigate();
  const data = useLoaderData();
  const [userData, setUserData] = useState<User[]>(() => {
    if (isResponse(data) && isUserArr(data.data)) {
      return data!.data;
    }
    return [];
  });
  const deleteUser = (id: string) => {
    setUserData([...userData.filter((user: User) => user._id !== id)]);
  };
  return (
    <div className="row py-3">
      <Confirm
        isOpen={modal.isOpen}
        toggle={() => toggleModal()}
        content={`${modal.name} ${modal.surname}`}
        _id={modal._id}
        removeItem={deleteUser}
      />
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
                  <Icon
                    path={mdiPencil}
                    title="Edit"
                    size={0.75}
                    color="black"
                  />
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setUser(user);
                  }}
                >
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
      <Button color="success" onClick={() => navigate("/add/user")} outline>
        Dodaj użytkownika
      </Button>
    </div>
  );
};
