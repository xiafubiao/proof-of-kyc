import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PrimusNetwork } from "@primuslabs/network-js-sdk";
import { ethers } from 'ethers'

function App() {

  const [address, setAddress] = useState();
  const [x, setX] = useState();
  const [attestation, setAttestation] = useState();
  


  const attst = async () => {
    const provider = window.ethereum;
    const primusNetwork = new PrimusNetwork();
    console.log(primusNetwork.supportedChainIds); // [84532 for Base sepolia, 8453 for Base]
  
    try {
      // 1. Initialize
      await primusNetwork.init(provider, 84532); // The Base Sepolia
      console.log("SDK initialized");
  
      // 2. Submit task, set TemplateID and user address.
      const submitTaskParams = {
        templateId: "9859330b-b94f-47a4-8f13-0ca56dabe273",
        address: address,
      };
      const submitTaskResult = await primusNetwork.submitTask(submitTaskParams);
      console.log("Task submitted:", submitTaskResult);
  
  
      // 3. Perform attestation
      const attestParams = {
        ...submitTaskParams,
        ...submitTaskResult,
       
      };
      const attestResult = await primusNetwork.attest(attestParams);
      console.log('Attestation completed:', attestResult);
      setX(attestResult);
     

      
      // 4. Verify & poll task result
      const verifyAndPollTaskResultParams = {
        taskId: attestResult[0].taskId,
        reportTxHash: attestResult[0].reportTxHash,
      }
      const taskResult = await primusNetwork.verifyAndPollTaskResult(verifyAndPollTaskResultParams);
      console.log("Final result:", taskResult);
    

      

    } catch (error) {
      console.error("Main flow error:", error);
    }
  }
    

  //connect Arconnect
  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    console.log(address);

    setAddress(address);
    //setSDKInstance(new MPCTLSJSSDK()); 

  };

/**
  const submitToChain = async () => {
    try {
      const sendToChainResult = await sdkInstance.sendToChain(
        attestation,
        window.ethereum
      );
      console.log(sendToChainResult); // Output: https://bascan.io/attestation/0x
      console.log("SendToChain successfully!");
    } catch (e) {
      alert(`SendToChain failed,code: ${e.code} ,message: ${e.message}`);
    }

  }
 */
  const handleClick = () => {
    setAttestation(x);
    
   // submitToChain();
  };



  return (
    <div>
      <div className="card1">
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
        <br />
        { <a>{address}</a>}
        <br />
      </div>

      <hr />

      <div className="card2">
        <button  onClick={attst}>
          Attest my web data through MPC-TLS
        </button>
      </div>


      <hr />

      <div>
    
      <textarea value={JSON.stringify(attestation, null, 2)} readOnly rows="8" cols="50"></textarea>
      <br /><br />
      
  
      <button onClick={handleClick}>Show the attestation result</button>
    </div>



  

</div>
  )

    
  }


  

export default App