import React, { useState, useRef } from "react";
import { Button, Input, Label } from "reactstrap";
import { addUser, editUser } from "../../utilities";
import { useAlert } from "../../contexts";
import { Retreat } from "../../components/Retreat/Retreat";
import { useLoaderData, useNavigate } from "react-router-dom";
import { User, isResponse, isUser, responseStatus } from "../../backendTypes";

export const UserForm = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const data = useLoaderData();
  let userModify = true;
  const [user, setUser] = useState<User>(() => {
    if (isResponse(data) && isUser(data.data)) {
      return data!.data;
    }
    userModify = false;
    return { _id: "", name: "", surname: "" };
  });
  const nameInput = useRef<HTMLInputElement>(null);
  const handleChange = (property: "name" | "surname", value: string) => {
    setUser({ ...user, [property]: value });
  };
  const modifyUserAction = async () => {
    const response = await editUser(user._id, {
      name: user.name,
      surname: user.surname,
    });
    alert.alertAndDismiss(response!.status);
    if (response!.status === responseStatus.SUCCESS) {
      navigate(-1);
    }
  };
  const addUserAction = async () => {
    const response = await addUser({ name: user.name, surname: user.surname });
    alert.alertAndDismiss(response!.status);
    if (response!.status === responseStatus.SUCCESS) {
      navigate(-1);
    }
    setUser({ ...user, name: "", surname: "" });
  };
  return (
    <>
      <Retreat />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (userModify) {
            modifyUserAction();
          } else {
            addUserAction();
          }
          setTimeout(() => nameInput.current!.focus(), 100);
        }}
      >
        <Label for="name">Imię</Label>
        <Input
          id="name"
          value={user.name}
          onChange={(e) => {
            handleChange("name", e.target.value);
          }}
          innerRef={nameInput}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          autoFocus
        ></Input>
        <Label for="surname">Nazwisko</Label>
        <Input
          id="surname"
          value={user.surname}
          onChange={(e) => {
            handleChange("surname", e.target.value);
          }}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          className="mb-2"
        ></Input>
        {userModify ? (
          <Button
            color="primary"
            disabled={
              isResponse(data) && isUser(data.data)
                ? user.name === data.data.name &&
                  user.surname === data.data.surname
                : false
            }
          >
            Zapisz
          </Button>
        ) : (
          <Button
            color="success"
            outline
            disabled={user.name.length === 0 || user.surname.length === 0}
          >
            Dodaj użytkownika
          </Button>
        )}
      </form>
    </>
  );
};
