import React from "react";
import { Modal, ModalHeader, Button, ModalBody, ModalFooter } from "reactstrap";
import {
  StateDropdown,
  RegionDropdown,
} from "react-india-state-region-selector";
export const LocationModal = ({
  open,
  showModal,
  state,
  region,
  setStateVal,
  setRegion,
  onClick,
}) => (
  <Modal isOpen={open} toggle={showModal}>
    <ModalHeader>Enter your location</ModalHeader>
    <ModalBody>
      <StateDropdown value={state} onChange={(val) => setStateVal(val)} />
      <RegionDropdown
        State={state}
        value={region}
        onChange={(val) => setRegion(val)}
      />
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={() => {
          onClick();
          showModal();
        }}
      >
        Select
      </Button>{" "}
    </ModalFooter>
  </Modal>
);
