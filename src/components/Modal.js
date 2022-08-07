import React from "react";
import { Button } from "@chakra-ui/react";

const Modal = ({ showModal, setShowModal, content }) => {
  //style
  const modalContent = {
    position: "relative",
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: "20px",
    borderRadius: "3px",
    boxShadow: "10px 10px 20px -5px rgba(0,0,0,0.9)",
  };

  const contentList = {
    textAlign: "left",
    padding: "5px",
    margin: "0px",
    listStyle: "none",
  };

  const overlay = {
    backdropFilter: "blur(5px) hue-rotate(10deg)",
    position: "fixed",
    zIndex: "100",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal ? (
        <div onClick={closeModal} id="overlay" style={overlay}>
          <div id="modalContent" style={modalContent}>
            <div style={contentList}>
              {content}
            </div>
            <Button
              background="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={closeModal}
            >
              Close
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
