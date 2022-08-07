import React, {useState} from "react";
import { Box, Button } from "@chakra-ui/react";
import Modal from "./Modal";
import Loading from "./Loading";

const MySenryu = ({
  accounts,
  readOnlyContract,
  showModal,
  setShowModal,
  modalItems,
  setModalItems
}) => {

  const [isLoading, setLoading] = useState(false);

  const isConnected = Boolean(accounts[0]);

  async function getMySenryu() {
    setLoading(true);
    try {
      console.log(
        "読込中…"
      );
      const rawIds = await readOnlyContract.getOwnerToIds(accounts[0]);
      const length = await rawIds.length;
      const allSenryuData = [];
      for (let i = 0; i < length; i++) {
        let senryuData = await readOnlyContract.senryus(rawIds[i]);
        allSenryuData[i] = {
          first: senryuData.first,
          second: senryuData.second,
          end: senryuData.end,
          poet: senryuData.poet,
          id: senryuData.id.toNumber(),
          likeCount: senryuData.likeCount.toNumber(),
        };
      }
      setModalItems(
          {mySenryu:allSenryuData.map((senryu, i) => (
          <li
            key={i}
          >{`${senryu.first} ${senryu.second} ${senryu.end}　　${senryu.poet} ID: ${senryu.id} Like: ${senryu.likeCount}`}</li>
        ))}
      );
      setLoading(false);
      setShowModal({mySenryu: true })
      console.log("おわったよ");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  if (isLoading) {
    return (
      <Box justify="center" align="center">
        <Box 
          padding="15px"
        >
         <Loading width="32px" height="32px" type="spinningBubbles" />
        </Box>
      </Box>
    );
  } else {
    return (
      <>
        {isConnected ? (
          <Box justify="center" align="center">
            <Button
              background="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              padding="15px"
              marginTop="10px"
              onClick={getMySenryu}
            >
              MySENRYU
            </Button>
            <Modal
              showModal={showModal.mySenryu}
              setShowModal={setShowModal}
              content={(<ul style={{listStyle: "none"}}>{modalItems.mySenryu}</ul>)}
            />
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  }
};

export default MySenryu;
