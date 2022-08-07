import React, { useState, useLayoutEffect } from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import Loading from "./Loading";
import Gold from "../assets/images/gold.png";
import Silver from "../assets/images/silver.png";


const Ranking = ({ readOnlyContract }) => {

  const [senryuData, setSenryuData] = useState({
    top: {
      first: "",
      second: "",
      end: "",
      poet: "",
      id: "",
      likeCount: "",
    },
    second: {
      first: "",
      second: "",
      end: "",
      poet: "",
      id: "",
      likeCount: "",
    },
    third: {
      first: "",
      second: "",
      end: "",
      poet: "",
      id: "",
      likeCount: "",
    },
  });
  const [isLoading, setLoading] = useState(false);

  async function sortSenryu() {
    setLoading(true);
    try {
      console.log("読込中…コントラクトの全ての川柳を読み込んでいるのでとても時間がかかります（改善案があれば教えて下さいm(__)m）");
      const rawLength = await readOnlyContract.getLength();
      const length = await rawLength.toNumber();
      const allSenryuData = [];
      for (let i = 0; i < length; i++) {
        let contractSenryuData = await readOnlyContract.senryus(i);
        if (contractSenryuData.likeCount > 0) {
          allSenryuData[i] = {
            first: contractSenryuData.first,
            second: contractSenryuData.second,
            end: contractSenryuData.end,
            poet: contractSenryuData.poet,
            id: contractSenryuData.id.toNumber(),
            likeCount: contractSenryuData.likeCount.toNumber(),
          };
        }
      }
      allSenryuData.sort(function (a, b) {
        return b.likeCount - a.likeCount;
      });
      setSenryuData({
        top: {
          first: allSenryuData[0].first,
          second: allSenryuData[0].second,
          end: allSenryuData[0].end,
          poet: allSenryuData[0].poet,
          id: allSenryuData[0].id,
          likeCount: allSenryuData[0].likeCount,
        },
        second: {
          first: allSenryuData[1].first,
          second: allSenryuData[1].second,
          end: allSenryuData[1].end,
          poet: allSenryuData[1].poet,
          id: allSenryuData[1].id,
          likeCount: allSenryuData[1].likeCount,
        },
        third: {
          first: allSenryuData[2].first,
          second: allSenryuData[2].second,
          end: allSenryuData[2].end,
          poet: allSenryuData[2].poet,
          id: allSenryuData[2].id,
          likeCount: allSenryuData[2].likeCount,
        },
      });
    } catch (err) {
      console.log("error: ", err);
    }
    setLoading(false);
  }

  useLayoutEffect(() => {
    sortSenryu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const top = senryuData.top;
  const second = senryuData.second;
  const third = senryuData.third;

  if (isLoading) {
    return (
      <Box paddingBottom="10px" justifyContent="center" align="center">
        <Text className="pressStart2p" margin="0">
          TOP3
        </Text>
        <Loading text="ランキング読込中…" />
      </Box>
    );
  } else {
    return (
      <Box
        paddingBottom="10px"
        maxWidth="550px"
        justify="center"
        align="center"
        margin="0 auto"
      >
        <Text className="pressStart2p" margin="0">
          TOP3
        </Text>
        <Flex align="center" padding="2px 0">
          <Image src={Gold} boxSize="32px" marginRight="5px" />
          <Box
            color="gold"
            fontWeight="600"
          >{`${top.first} ${top.second} ${top.end}　　${top.poet} Like: ${top.likeCount}`}</Box>
        </Flex>
        <Flex align="center" padding="2px 0">
          <Image src={Silver} boxSize="32px" marginRight="5px" />
          <Box fontWeight="600">{`${second.first} ${second.second} ${second.end}　　${second.poet} Like: ${second.likeCount}`}</Box>
        </Flex>
        <Flex align="center" padding="2px 0">
          <Box boxSize="32px" marginRight="5px" />
          <Box>{`${third.first} ${third.second} ${third.end}　　${third.poet} Like: ${third.likeCount}`}</Box>
        </Flex>
      </Box>
    );
  }
};

export default Ranking;
