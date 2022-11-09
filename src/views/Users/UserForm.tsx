import React, { useEffect, useState, useRef } from "react";
import { Alert, Button, Input, Label } from "reactstrap";
import { patchRequest, postRequest } from "../../utilities";
import { Retreat } from "../../components/Retreat/Retreat";
import { useLoaderData } from "react-router-dom";

export const UserForm = () => {
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
    setStatus(
      await patchRequest({
        path: `api/user/${user._id}`,
        payload: { name: user.name, surname: user.surname },
      })
    );
    userData.name = user.name;
    userData.surname = user.surname;
  };
  const addUserAction = async () => {
    setStatus(
      await postRequest({
        path: "api/user",
        payload: { name: user.name, surname: user.surname },
      })
    );
    setUser({ ...user, name: "", surname: "" });
  };
  console.log(`${userData.surname} -> ${user.surname}`);
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
