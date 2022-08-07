import React from "react";
import Modal from './Modal';
import { Image } from "@chakra-ui/react";
import AboutContent from "../assets/images/about.jpg"

const About = ({ showModal, setShowModal }) => {

  return (
    <Modal 
      showModal={showModal.about}
      setShowModal={setShowModal}
      content={
        <>
          <Image width="80vw" src={AboutContent}/>
        </>
      }
    />
  )
}

export default About;