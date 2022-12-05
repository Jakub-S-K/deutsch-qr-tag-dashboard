import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Input, Label } from "reactstrap";
import { Retreat } from "../../components/Retreat/Retreat";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { postRequest, patchRequest } from "../../utilities";
import { responseStatus, User } from "../../backendTypes";
import { AlertContext } from "../../contexts";

interface Team {
  name: string;
  members: User[];
}

export const TeamForm = () => {
  const isTeam = (data: unknown): data is Team => {
    return (
      typeof data === "object" &&
      data !== null &&
      data !== undefined &&
      "name" in data &&
      "members" in data
    );
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const alert = useContext(AlertContext);
  const modify = useRef<boolean>(false);
  const loaderData: unknown = useLoaderData();
  const [teamName, setTeamName] = useState<string>("");
  const [members, setMembers] = useState<User[]>([]);
  useEffect(() => {
    if (isTeam(loaderData)) {
      modify.current = true;
      setTeamName(loaderData.name);
      setMembers([...loaderData.members]);
    }
  }, []);
  const appendMember = (user: User) => {
    setMembers([...members, user]);
    answerRef.current!.value = "";
  };
  const removeMember = (index: number) => {
    setMembers([...members.filter((_, ind) => ind !== index)]);
  };
  const handleEnterPress = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (e.currentTarget.value.length > 0) {
        appendMember(e.currentTarget.value);
      }
    }
  };
  const compareArrays = (arr1: Array<any>, arr2: Array<any>) => {
    const areEqual = arr1.every((elem) => {
      return arr2.includes(elem);
    });
    return areEqual;
  };
  const answerRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Retreat />
      <form
        onSubmit={async (e: any) => {
          e.preventDefault();
          if (members.length < 1) {
            alert.alertAndDismiss(responseStatus.ERR_BAD_REQUEST, {
              message: `W zespole musi być conajmniej 1 uczestnik.`,
            });
            return null;
          }
          if (modify.current && isTeam(loaderData)) {
          } else {
          }
        }}
      >
        <>
          <Label for="teamNameContent">Treść pytania</Label>
          <Input
            id="teamNameContent"
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            onChange={(e) => setTeamName(e.currentTarget.value)}
            value={teamName}
            required
            autoFocus
          ></Input>
          <h5 className="mt-3">Członkowie</h5>
          <hr></hr>
          {members.map((member, index) => {
            return (
              <div className="d-flex flex-row py-2" key={`answer-${index}`}>
                <Label for={`answer${index + 1}`}>{index + 1}</Label>
                <Input
                  id={`answer${index + 1}`}
                  onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    )
                  }
                  value={member.name + " " + member.surname}
                  className="mx-2"
                  required
                ></Input>
                <Button
                  color="danger"
                  outline
                  onClick={() => {
                    removeMember(index);
                  }}
                  style={{ width: "38px", height: "38px" }}
                  className="text-center"
                >
                  -
                </Button>
              </div>
            );
          })}
          <div className="d-flex flex-row py-2">
            <Label for="memberx">{members.length + 1}</Label>
            <Input
              id="memberx"
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              onKeyDown={(e) => handleEnterPress(e)}
              className="mx-2"
              innerRef={answerRef}
            ></Input>
            <Button
              color="success"
              outline
              onClick={() => {
                appendMember({ name: "Jan", surname: "Kowalski", _id: "1234" });
              }}
              style={{ width: "38px", height: "38px" }}
              className="text-center"
            >
              +
            </Button>
          </div>
          {modify.current ? (
            <div className="my-3 row">
              <Button color="primary" type="submit">
                Zapisz
              </Button>
            </div>
          ) : (
            <div className="my-3 row">
              <Button
                color="success"
                type="submit"
                outline
                onClick={() => {
                  //navigate(-1);
                }}
              >
                Dodaj pytanie
              </Button>
            </div>
          )}
        </>
      </form>
    </>
  );
};
