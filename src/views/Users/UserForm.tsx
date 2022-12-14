import React, { useEffect, useState, useRef } from "react";
import { Alert, Button, Input, Label } from "reactstrap";
import { addUser, editUser } from "../../utilities";
import { Retreat } from "../../components/Retreat/Retreat";
import { useLoaderData, useNavigate } from "react-router-dom";
import { responseStatus } from "../../backendTypes";

export const UserForm = () => {
  const navigate = useNavigate();
  let userData: any = useLoaderData();
  let userModify = true;
  if (!userData) {
    userData = { name: "", surname: "" };
    userModify = false;
  }
  const [user, setUser] = useState(userData);
  const nameInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<number | undefined>(-1);
  useEffect(() => {
    setTimeout(() => {
      setStatus(-1);
    }, 2000);
  }, [status]);
  const handleChange = (property: "name" | "surname", value: string) => {
    setUser({ ...user, [property]: value });
  };
  const modifyUserAction = async () => {
    const status = await editUser(user._id, {
      name: user.name,
      surname: user.surname,
    });
    setStatus(status!.status);
    if (status!.status === responseStatus.SUCCESS) {
      navigate(-1);
    }
  };
  const addUserAction = async () => {
    const response = await addUser({ name: user.name, surname: user.surname });
    if (response!.status) {
      setStatus(response!.status);
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
        {status === 200 ? <Alert>Zapisano pomyślnie</Alert> : null}
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
              user.name === userData.name && user.surname === userData.surname
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
