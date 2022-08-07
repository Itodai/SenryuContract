const hre = require("hardhat");

async function main() {

  const SenryuContract = await hre.ethers.getContractFactory("SenryuContract");
  const senryuContract = await SenryuContract.deploy();

  await senryuContract.deployed();

  console.log("SenryuContract deployed to:", senryuContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
