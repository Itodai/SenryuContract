import React from "react";
import { Box, Button } from "@chakra-ui/react";
import Loading from "./Loading";

const Vote = ({
  accounts,
  id,
  contract,
  setLikeCount,
  voteLoading,
  setVoteLoading,
}) => {

  const isConnected = Boolean(accounts[0]);

  async function vote() {
    setVoteLoading(true);
    try {
      const targetId = id;
      const senryus = await contract.senryus(targetId);
      const likeCount = senryus.likeCount.toNumber();
      console.log(`likeCount: ${likeCount}`);
      const tx = await contract.addLikeCount(targetId);
      console.log("川柳コントラクトにTxが投げられました…");
      const receipt = await tx.wait();
      const events = receipt?.events;
      console.log(
        "無事川柳への投票が書き込まれイベントが発行されました！",
        events
      );
      const eventsData = events["0"].args;
      setLikeCount(eventsData.count.toNumber());
      console.log(`likeCount: ${eventsData.count.toNumber()}`);
    } catch (err) {
      console.log("error: ", err);
    }
    setVoteLoading(false);
  }

  if (isConnected) {
    if (voteLoading) {
      return (
        <Box justify="center" align="center">
          <Box padding="5px" marginLeft="auto">
            <Loading width="32px" height="32px" type="spinningBubbles" />
          </Box>
        </Box>
      );
    } else {
      return (
        <Button
          background="#D6517D"
          borderRadius="5px"
          boxShadow="0px 2px 2px 1px #0F0F0F"
          color="white"
          cursor="pointer"
          padding="5px"
          marginLeft="auto"
          onClick={vote}
        >
          VOTE
        </Button>
      );
    }
  } else {
    return (
      <Box color="white" padding="5px" marginLeft="auto">
        VOTE
      </Box>
    );
  }
};

export default Vote;
