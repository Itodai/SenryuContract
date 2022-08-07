import React from "react";
import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
// import Eth from "../assets/images/eth.png";
// import Facebook from './assets/images/facebook_32x32.png'
// import Discord from "../assets/images/discord_32x32.png";
import Twitter from "../assets/images/twitter_32x32.png";
import Faucet from "../assets/images/faucet.png";
import Email from "../assets/images/email_32x32.png";
import MySenryu from "./MySenryu";
import About from "./About";

const NavBar = ({
  readOnlyContract,
  accounts,
  setAccounts,
  showModal,
  setShowModal,
  modalItems,
  setModalItems,
}) => {

  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="15px">
      {/* 左側 - ソーシャルメディアアイコン */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="https://twitter.com/Dsk8103" target="_blank">
          <Image src={Twitter} boxSize="42px" margin="0 15px"></Image>
        </Link>
        <Link href="mailto:itodai.crypto@gmail.com" target="_blank">
          <Image src={Email} boxSize="42px" margin="0 15px"></Image>
        </Link>
        <Link href="https://goerli-faucet.slock.it/" position="relative" target="_blank">
          <Image src={Faucet} boxSize="42px" margin="0 15px" ></Image>
          <Text className="pressStart2p"  fontSize="10px" color="white" margin="0" top="25px" left="15px" position="absolute">Faucet</Text>
        </Link>
      </Flex>

      {/* 右側 - セクションとコネクト*/}
      <Flex justify="space-around" align="center" width="40%" padding="15px">
        <Box
          margin="0 15px"
          cursor="pointer"
          _hover={{ fontWeight: "bold", color: "#D6517D" }}
          onClick={() => setShowModal({ about: true })}
        >
          About
        </Box>
        <About showModal={showModal} setShowModal={setShowModal} />
        {isConnected ? (
          //メタマスクと接続している場合
          <>
          <Box margin="0 15px">
            <MySenryu
              readOnlyContract={readOnlyContract}
              accounts={accounts}
              showModal={showModal}
              setShowModal={setShowModal}
              modalItems={modalItems}
              setModalItems={setModalItems}
            />
          </Box>
          <Box margin="0 15px">Connected</Box>
          </>
        ) : (
          //メタマスクと接続していない場合
          <>
          <Box margin="0 15px">MySENRYU</Box>
          <Button
            background="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}
          >
            Connect
          </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
