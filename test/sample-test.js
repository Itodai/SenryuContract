const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SenryuContract", function () {
  let owner, addr1, addr2;
  let contract;
  const first = ["古池や", "aaaaa", "11111", "test"];
  const second = ["蛙飛び込む", "bbbbbbb", "2222222", "test"];
  const end = ["水の音", "ccccc", "33333", "test"];
  const creater = ["Itodai", "2todai", "3todai", "4san"];
  beforeEach(async function () {
    const factory = await ethers.getContractFactory("SenryuContract");
    contract = await factory.deploy();
    await contract.deployed();
    [owner, addr1, addr2] = await ethers.getSigners();
    await contract.readSenryu(first[0], second[0], end[0], creater[0]);
    await contract.readSenryu(first[1], second[1], end[1], creater[1]);
    await contract.readSenryu(first[2], second[2], end[2], creater[2]);
    await contract
      .connect(addr1)
      .readSenryu(first[3], second[3], end[3], creater[3]);
    await contract.addLikeCount(0);
  });
  it("Reading senryu test", async function () {
    const senryuData = await contract.senryus(0);
    expect(await senryuData.id).to.equal(0);
    expect(await senryuData.poet).to.equal(creater[0]);
    expect(await senryuData.first).to.equal(first[0]);
    expect(await senryuData.second).to.equal(second[0]);
    expect(await senryuData.end).to.equal(end[0]);
  });
  it("Getting senryus length", async function () {
    expect(await contract.getLength()).to.equal(4);
  });
  it("Getting Senryu id & Data", async function () {
    const ownerToId = await contract.getSenryu(addr1.address);
    expect(await ownerToId.length).to.equal(1);
  });
  it("Hit like count", async function () {
    const senryuData = await contract.senryus(0);
    const likeCount = await senryuData.likeCount;
    expect(likeCount).to.equal(1);
  });
  it("Getting owner's Senryu of first, second, end", async function () {
    const ids = await contract.getSenryu(owner.address); //配列
    const senryu = []; //グローバル風配列を宣言
    for (i = 0; i < ids.length; i++) {
      let senryuData = await contract.senryus(ids[i]);
      senryu[i] = await [
        senryuData.first,
        senryuData.second,
        senryuData.end,
        senryuData.poet,
      ];
    }
    // console.log(senryu[0]);
    expect(JSON.stringify(senryu[1]))
    .to.equal(
      JSON.stringify(
        [first[1], second[1], end[1], creater[1]]
      )
    );
  });
});
