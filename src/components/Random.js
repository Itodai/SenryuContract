import React, { useState, useLayoutEffect } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Reload from "../assets/images/reload.png";
import Vote from "./Vote";
import Loading from "./Loading";

const Random = ({ accounts, contract, readOnlyContract }) => {
  const [senryuData, setSenryuData] = useState({
    first: "",
    second: "",
    end: "",
    poet: "",
    id: "",
  });
  const [likeCount, setLikeCount] = useState("");
  const [randomVoteLoading, setRandomVoteLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function setSenryu() {
    setLoading(true);
    try {
      const rawLength = await readOnlyContract.getLength();
      const length = await rawLength.toNumber();
      const randomId = Math.floor(Math.random() * length);
      const randomSenryuData = await readOnlyContract.senryus(randomId);
      setSenryuData({
        first: randomSenryuData.first,
        second: randomSenryuData.second,
        end: randomSenryuData.end,
        poet: randomSenryuData.poet,
        id: randomSenryuData.id.toNumber(),
        // likeCount: randomSenryuData.likeCount.toNumber(),
      });
      setLikeCount(randomSenryuData.likeCount.toNumber());
    } catch (err) {
      console.log("error: ", err);
    }
    setLoading(false);
  }

  useLayoutEffect(() => {
    setSenryu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // return (
  //   <Box padding="5px 0">
  //       {isLoading ? (
  //         <Box>
  //         <Text className="pressStart2p" margin="0">
  //             RANDOM
  //           </Text>
  //         <Box marginRight="5px" boxSize="32px">
  //           <Loading type="spinningBubbles" height="32px" width="32px" />
  //         </Box>
  //         </Box>
  //       ) : (
  //         <>
  //           <Text className="pressStart2p" margin="0">
  //             RANDOM
  //           </Text>
  //           <Image
  //             marginRight="5px"
  //             src={Reload}
  //             boxSize="32px"
  //             cursor="pointer"
  //             onClick={setSenryu}
  //           />
  //         </>
  //       )}
  //       <Flex
  //         whiteSpace="nowrap"
  //         align="center"
  //         className="slideshow"
  //         _hover={{ animationPlayState: "paused" }}
  //       >
  //         <Box display="flex">
  //           <p>あああああ</p>
  //           <p>いいいいいいい</p>
  //           <p>ううううう</p>
  //           <p>１なぞにく</p>

  //           <Vote
  //             accounts={accounts}
  //             id={senryuData.id}
  //             contract={contract}
  //             voteLoading={randomVoteLoading}
  //             setVoteLoading={setRandomVoteLoading}
  //             setLikeCount={setLikeCount}
  //           />
  //         </Box>
  //         <Box display="flex">
  //           <p>あああああ</p>
  //           <p>いいいいいいい</p>
  //           <p>ううううう</p>
  //           <p>２なぞにく</p>
  //           <Vote
  //             accounts={accounts}
  //             id={senryuData.id}
  //             contract={contract}
  //             voteLoading={randomVoteLoading}
  //             setVoteLoading={setRandomVoteLoading}
  //             setLikeCount={setLikeCount}
  //           />
  //         </Box>
  //         <Box display="flex">
  //           <p>あああああ</p>
  //           <p>いいいいいいい</p>
  //           <p>ううううう</p>
  //           <p>３なぞにく</p>
  //           <Vote
  //             accounts={accounts}
  //             id={senryuData.id}
  //             contract={contract}
  //             voteLoading={randomVoteLoading}
  //             setVoteLoading={setRandomVoteLoading}
  //             setLikeCount={setLikeCount}
  //           />
  //         </Box>
  //         <Box display="flex">
  //           <p>あああああ</p>
  //           <p>いいいいいいい</p>
  //           <p>ううううう</p>
  //           <p>４なぞにく</p>
  //           <Vote
  //             accounts={accounts}
  //             id={senryuData.id}
  //             contract={contract}
  //             voteLoading={randomVoteLoading}
  //             setVoteLoading={setRandomVoteLoading}
  //             setLikeCount={setLikeCount}
  //           />
  //         </Box>
  //         <Box display="flex">
  //           <p>あああああ</p>
  //           <p>いいいいいいい</p>
  //           <p>ううううう</p>
  //           <p>５なぞにく</p>
  //           <Vote
  //             accounts={accounts}
  //             id={senryuData.id}
  //             contract={contract}
  //             voteLoading={randomVoteLoading}
  //             setVoteLoading={setRandomVoteLoading}
  //             setLikeCount={setLikeCount}
  //           />
  //         </Box>
  //         <Box display="flex">
  //           <p>あああああ</p>
  //           <p>いいいいいいい</p>
  //           <p>ううううう</p>
  //           <p>６なぞにく</p>
  //           <Vote
  //             accounts={accounts}
  //             id={senryuData.id}
  //             contract={contract}
  //             voteLoading={randomVoteLoading}
  //             setVoteLoading={setRandomVoteLoading}
  //             setLikeCount={setLikeCount}
  //           />
  //         </Box>
  //       </Flex>
  //       {/* <Button
  //         background="#D6517D"
  //         borderRadius="5px"
  //         boxShadow="0px 2px 2px 1px #0F0F0F"
  //         color="white"
  //         cursor="pointer"
  //         fontFamily="inherit"
  //         padding="5px"
  //         marginLeft="auto"
  //         onClick={vote}
  //       >
  //         VOTE
  //       </Button> */}
  //       <Flex marginLeft="5px" alignItems="right"></Flex>
  //   </Box>
  // );

  return (
    <Box
      padding="10px 0"
      maxWidth="550px"
      justify="center"
      align="center"
      margin="0 auto"
    >
      <Text className="pressStart2p" margin="0">
        RANDOM
      </Text>

      <Flex maxWidth="550px" justify="center" align="center" margin="0 auto">
        {isLoading ? (
          <Box
          marginRight="5px"
          boxSize="32px"
          >
            <Loading type="spinningBubbles" height="32px" width="32px"/>
          </Box>
        ) : (
          <Image
            marginRight="5px"
            src={Reload}
            boxSize="32px"
            cursor="pointer"
            onClick={setSenryu}
          />
        )}
        <Box>
          {`
            ${senryuData.first}
            ${senryuData.second}
            ${senryuData.end}
            ${senryuData.poet}
            Like: ${likeCount}
          `}
        </Box>
        <Vote
          accounts={accounts}
          id={senryuData.id}
          contract={contract}
          voteLoading={randomVoteLoading}
          setVoteLoading={setRandomVoteLoading}
          setLikeCount={setLikeCount}
        />
        {/* <Button
          background="#D6517D"
          borderRadius="5px"
          boxShadow="0px 2px 2px 1px #0F0F0F"
          color="white"
          cursor="pointer"
          fontFamily="inherit"
          padding="5px"
          marginLeft="auto"
          onClick={vote}
        >
          VOTE
        </Button> */}
        <Flex marginLeft="5px" alignItems="right"></Flex>
      </Flex>
    </Box>
  );

};

export default Random;
