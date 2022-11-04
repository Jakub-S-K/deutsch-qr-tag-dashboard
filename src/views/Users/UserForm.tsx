import React, { useEffect, useState } from "react";
import { Alert, Button, Input, Label, Table } from "reactstrap";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { User } from "../../backendTypes";
import { loader } from "../../utilities";
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
  const [status, setStatus] = useState(-1);
  useEffect(() => {
    setTimeout(() => {
      setStatus(-1);
    }, 2000);
  }, [status]);
  const handleChange = (property: "name" | "surname", value: string) => {
    setUser({ ...user, [property]: value });
  };
  console.log(`${userData.surname} -> ${user.surname}`);
  return (
    <>
      <Retreat />
      {status === 200 ? <Alert>Zapisano pomyślnie</Alert> : null}
      <Label for="name">Imię</Label>
      <Input
        id="name"
        value={user.name}
        onChange={(e) => {
          handleChange("name", e.target.value);
        }}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
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
          onClick={async () =>
            setStatus(
              await loader({
                path: `api/user/${user._id}`,
                requestType: "PATCH",
                payload: { name: user.name, surname: user.surname },
              })
            )
          }
        >
          Zapisz
        </Button>
      ) : (
        <Button
          color="success"
          outline
          onClick={async () =>
            setStatus(
              await loader({
                path: "api/user",
                requestType: "POST",
                payload: { name: user.name, surname: user.surname },
              })
            )
          }
        >
          Dodaj użytkownika
        </Button>
      )}
    </>
  );
};
