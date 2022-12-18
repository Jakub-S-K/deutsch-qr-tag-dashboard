import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteQuestion, deleteTeam, deleteUser } from "../../utilities";
import { responseStatus } from "../../backendTypes";
import { useAlert } from "../../contexts";

type ConfirmProps = {
  isOpen: boolean;
  toggle: Function;
  _id: string;
  content?: string;
  removeItem: Function;
  target?: "user" | "question" | "team";
};

export const Confirm = ({
  isOpen,
  toggle,
  _id,
  removeItem,
  content = "",
  target = "user",
}: ConfirmProps) => {
  const alert = useAlert();
  const getTarget = () => {
    if (target === "user") {
      return "użytkownika";
    }
    if (target === "question") {
      return "pytanie";
    }
    if (target === "team") {
      return "zespół";
    }
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Usuń użytkownika</ModalHeader>
      <ModalBody>
        Czy na pewno chcesz usunąć {getTarget()} {`${content} `}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={() => toggle()}>
          Anuluj
        </Button>
        <Button
          color="danger"
          onClick={async () => {
            const action = (status: number) => {
              if (status === responseStatus.SUCCESS) {
                alert.alertAndDismiss(status);
                toggle();
                removeItem(_id);
              }
            };
            if (target === "user") {
              const response = await deleteUser(_id);
              action(response.status);
            }
            if (target === "question") {
              const response = await deleteQuestion(_id);
              action(response.status);
            }
            if (target === "team") {
              const response = await deleteTeam(_id);
              action(response.status);
            }
          }}
        >
          Usuń
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};
