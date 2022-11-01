import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";
import { loader } from "../../utilities";
import { User } from "../../backendTypes";

type ConfirmProps = {
  isOpen: boolean;
  toggle: Function;
  _id: string;
  name: string;
  surname: string;
} & User;

export const Confirm = ({
  isOpen,
  toggle,
  name,
  surname,
  _id,
}: ConfirmProps) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>Usuń użytkownika</ModalHeader>
      <ModalBody>
        Czy na pewno chcesz usunąć użytkownika{name ? " " + name : ""}
        {surname ? " " + surname : ""}?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={() => toggle()}>
          Anuluj
        </Button>
        <Button
          color="danger"
          onClick={() =>
            loader({ path: `api/user/${_id}`, requestType: "DELETE" })
          }
        >
          Usuń
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};
