/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import {
  isResponse,
  Team,
  responseStatus,
  isTeamArr,
} from "../../backendTypes";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Confirm } from "../../components/Confirm/Confirm";
import { useAlert } from "../../contexts";
import { Retreat } from "../../components/Retreat/Retreat";

type ModalProps = {
  isOpen: boolean;
  name: string;
  _id: string;
};

export const Teams = () => {
  const names = ["id", "Nazwa", "Członkowie", "Akcje"];
  const alert = useAlert();
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    name: "",
    _id: "",
  });
  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
  };
  const setQuestion = (question: Team) => {
    setModal({ ...modal, isOpen: !modal.isOpen, ...question });
  };
  const navigate = useNavigate();
  const data = useLoaderData();
  const [questionData, setQuestionData] = useState<Team[]>(() => {
    if (isResponse(data) && isTeamArr(data.data)) {
      console.log(data.data);
      return data.data;
    }
    return [];
  });
  const deleteQuestion = (id: string) => {
    setQuestionData([
      ...questionData.filter((question: Team) => question._id !== id),
    ]);
  };
  useEffect(() => {
    if (isResponse(data) && data.status !== responseStatus.SUCCESS) {
      alert.alertAndDismiss(data.status);
    }
  }, []);
  if (typeof questionData !== "object") {
    return <div></div>;
  }
  return (
    <div className="row py-3">
      <div className="col col-12">
        <Retreat />
      </div>
      <Confirm
        isOpen={modal.isOpen}
        toggle={() => toggleModal()}
        content={`"${modal.name}"`}
        _id={modal._id}
        removeItem={deleteQuestion}
        target="team"
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
          {questionData.map((question: any, index: number) => (
            <tr key={index + "-r"}>
              <td key={index + "-id"}>{question._id}</td>
              <td key={index + "-name"}>{question.name}</td>
              <td key={index + "-count"}>{question.members.length}</td>
              <td>
                <Button
                  color="warning"
                  className="mx-2"
                  onClick={() => navigate(`/teams/${question._id}`)}
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
                    setQuestion(question);
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
      <Button color="success" onClick={() => navigate("/add/team")} outline>
        Dodaj Zespół
      </Button>
    </div>
  );
};
