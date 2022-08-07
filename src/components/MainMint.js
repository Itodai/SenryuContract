import { useState } from "react";
import { Box, Button, Flex, Text, Link } from "@chakra-ui/react";
import Modal from "./Modal";
import Loading from "./Loading";
import SenryuInput from "./SenryuInput";

const MainMint = ({
  contract,
  accounts,
  showModal,
  setShowModal,
  modalItems,
  setModalItems,
}) => {
  const [senryuData, setSenryuData] = useState({
    first: "",
    second: "",
    end: "",
    poet: "",
  });
  const [isLoading, setLoading] = useState(false);

  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    setLoading(true);
    if (window.ethereum) {
      try {
        const tx = await contract.mintSenryu(
          senryuData.first,
          senryuData.second,
          senryuData.end,
          senryuData.poet
        );
        console.log("川柳コントラクトにTxが投げられました…");
        const receipt = await tx.wait();
        const events = receipt?.events; // # => Event[] | undefined
        const eventsData = events["0"].args;
        console.log("無事川柳が書き込まれイベントが発行されました！", events);
        setModalItems({
          mainMint: (
            <>
              <p>Your SENRYU has been inscribed on the blockchain!!</p>
              <p>{`初句: ${eventsData.first}`}</p>
              <p>{`二句: ${eventsData.second}`}</p>
              <p>{`結句: ${eventsData.end}`}</p>
              <p>{`柳人: ${
                eventsData.poet
              } ID: ${eventsData.id.toNumber()}`}</p>
            </>
          ),
        });
        setSenryuData({ first: "", second: "", end: "", poet: "" });
        setShowModal({ mainMint: true });
      } catch (err) {
        console.log("error: ", err);
      }
      setLoading(false);
    }
  }

  return (
    <Flex justify="center" align="center" height="70vh" paddingBottom="150px">
      <Box maxWidth="520px">
        <div>
          <Link
            className="pressStart2p"
            color="#4ab4fc"
            fontSize="12px"
            textShadow="0 2px #000000"
            textDecoration="none"
            _hover={{ fontWeight: "bold", textDecoration: "underline" }}
            href="https://qiita.com/ItodaiCrypto/items/563214a28239c6f9cf0e"
            target="_blank"
          >
            Ethereum Goerli Testnet
          </Link>
          <Text
            className="pressStart2p"
            marginTop="10px"
            fontSize="30px"
            textShadow="0 5px #000000"
          >
            SENRYU CONTRACT
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <SenryuInput
                placeholder="五"
                width="100px"
                value={senryuData.first}
                onChange={(event) =>
                  setSenryuData({ ...senryuData, first: event.target.value })
                }
              />
              <SenryuInput
                placeholder="七"
                width="150px"
                value={senryuData.second}
                onChange={(event) =>
                  setSenryuData({ ...senryuData, second: event.target.value })
                }
              />
              <SenryuInput
                placeholder="五"
                width="100px"
                value={senryuData.end}
                onChange={(event) =>
                  setSenryuData({ ...senryuData, end: event.target.value })
                }
              />
              <SenryuInput
                placeholder="なまえ"
                width="100px"
                value={senryuData.poet}
                onChange={(event) =>
                  setSenryuData({ ...senryuData, poet: event.target.value })
                }
              />
            </Flex>
            <Flex
              margin="20px"
              align="center"
              justify="center"
            >{`${senryuData.first} ${senryuData.second} ${senryuData.end}　　${senryuData.poet}`}</Flex>
            {isLoading ? (
              <Box paddingBottom="10px" justifyContent="center" align="center">
                <Loading text="Tx処理中…" />
              </Box>
            ) : (
              <Button
                background="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleMint}
              >
                SENRYU NOW
              </Button>
            )}

            <Modal
              showModal={showModal.mainMint}
              setShowModal={setShowModal}
              content={modalItems.mainMint}
            />
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="D6517D"
          >
            You must be connected to Senryu.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
