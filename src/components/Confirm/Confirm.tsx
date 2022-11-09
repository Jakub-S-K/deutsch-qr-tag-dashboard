import React, { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { deleteRequest } from "../../utilities";
import { responseStatus, User } from "../../backendTypes";
import { AlertContext } from "../../contexts";

type ConfirmProps = {
  isOpen: boolean;
  toggle: Function;
  _id: string;
  name: string;
  surname: string;
  deleteUser: Function;
} & User;

export const Confirm = ({
  isOpen,
  toggle,
  name,
  surname,
  _id,
  deleteUser,
}: ConfirmProps) => {
  const alert = useContext(AlertContext);
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
          onClick={async () => {
            const status = await deleteRequest({ path: `api/user/${_id}` });
            if (status === responseStatus.SUCCESS) {
              alert.alertAndDismiss(status);
              toggle();
              deleteUser(_id);
            }
          }}
        >
          Usuń
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};
