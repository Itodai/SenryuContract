import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import MainMint from "./components/MainMint";
import NavBar from "./components/NavBar";
import Random from "./components/Random";
import Ranking from "./components/Ranking";
import Senryu from "./artifacts/contracts/Senryu.sol/SenryuContract.json";

function App() {

  //~~~ Ethereum rinkeby testnet ver ~~~
  // const rpcURL = process.env.REACT_APP_RINKEBY_RPC_URL;

  // ~~~ Ethereum goerli testnet ver ~~~
  const rpcURL = process.env.REACT_APP_GOERLI_RPC_URL;

  //~~~ Polygon mumbai testnet ver ~~~
  // const rpcURL = process.env.REACT_APP_MUMBAI_RPC_URL;

  const SenryuAddress = Senryu.contractAddress;
  const readOnlyProvider = new ethers.providers.JsonRpcProvider(rpcURL)
  const readOnlyContract = new ethers.Contract(SenryuAddress, Senryu.abi, readOnlyProvider);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer =  provider.getSigner();
  const contract = new ethers.Contract(SenryuAddress, Senryu.abi, signer);

  //useState(React hooks)
  const [accounts, setAccounts] = useState([]);
  const [showModal, setShowModal] = useState({});
  const [modalItems, setModalItems] = useState({});

  return (
    <div className="overlay">
      <div className="App">
        <NavBar
          readOnlyContract={readOnlyContract}
          accounts={accounts}
          setAccounts={setAccounts}
          showModal={showModal}
          setShowModal={setShowModal}
          modalItems={modalItems}
          setModalItems={setModalItems}
        />
        <Ranking
          readOnlyContract={readOnlyContract}
        />
        <Random
          contract={contract}
          accounts={accounts}
          readOnlyContract={readOnlyContract}
        />
        <MainMint
          contract={contract}
          accounts={accounts}
          showModal={showModal}
          setShowModal={setShowModal}
          modalItems={modalItems}
          setModalItems={setModalItems}
        />
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;
