//SPDX-License-Identifier: UNLICENCED
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract SenryuContract {
  struct Senryu {
    address owner;
    uint256 id;
    string poet;
    string first;
    string second;
    string end;
    uint256 likeCount;
  }

  Senryu[] public senryus;

  mapping(address => uint256[]) public ownerToSenryu;

  event totalLikeCount(uint count);
  event SenryuData(string first, string second, string end, string poet, uint id);

  function getLength() public view returns (uint256) {
    return senryus.length;
 }

  function mintSenryu(
    string memory _first, 
    string memory _second, 
    string memory _end, 
    string memory _poet
  ) public {
    address owner = msg.sender;
    uint256 id = senryus.length;
    uint256 likeCount = 0;
    Senryu memory newSenryu = Senryu(owner, id, _poet, _first, _second, _end, likeCount);
    senryus.push(newSenryu);
    ownerToSenryu[owner].push(id);
    emit SenryuData(_first, _second, _end, _poet, id);
    console.log(_first, _second, _end, _poet);
  }

  function addLikeCount(uint256 _id) public {
    senryus[_id].likeCount++;
    uint totalCount = senryus[_id].likeCount;
    emit totalLikeCount(totalCount);
  }

  function getOwnerToIds(address _owner) public view returns(uint256[] memory){
      uint numOfSenryu = ownerToSenryu[_owner].length;
      uint[] memory ids = new uint[](numOfSenryu);

      for(uint i=0; i < numOfSenryu; i++) {
            uint id = ownerToSenryu[_owner][i];
            ids[i] = (senryus[id].id);
        }
        return ids;
  }
}