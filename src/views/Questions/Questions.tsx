import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import { Question } from "../../backendTypes";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Confirm } from "../../components/Confirm/Confirm";

type ModalProps = {
  isOpen: boolean;
  name: string;
  question: string;
  _id: string;
};

export const Questions = () => {
  const names = ["id", "Pytanie", "Akcje"];
  const [modal, setModal] = useState<ModalProps>({
    isOpen: false,
    name: "",
    question: "",
    _id: "",
  });
  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
  };
  const setQuestion = (question: Question) => {
    setModal({ ...modal, isOpen: !modal.isOpen, ...question });
  };
  const navigate = useNavigate();
  const [questionData, setQuestionData]: any = useState(useLoaderData());
  const deleteQuestion = (id: string) => {
    setQuestionData([
      ...questionData.filter((question: Question) => question._id !== id),
    ]);
  };
  return (
    <div className="row py-3">
      <Confirm
        isOpen={modal.isOpen}
        toggle={() => toggleModal()}
        name={modal.name}
        surname={modal.question}
        _id={modal._id}
        deleteUser={deleteQuestion}
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
              <td key={index + "-name"}>{question.question}</td>
              <td>
                <Button
                  color="warning"
                  className="mx-2"
                  onClick={() => navigate(`/questions/${question._id}`)}
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
      <Button color="success" onClick={() => navigate("/add/question")} outline>
        Dodaj pytanie
      </Button>
    </div>
  );
};
