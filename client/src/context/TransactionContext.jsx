import React, {useEffect,useState} from 'react';
import {ethers} from 'ethers';
import { contractABI,contractAddress} from '../utilis/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transcactionContract = new ethers.Contract(contractAddress,contractABI,signer);

    console.log({
        provider,
        signer,
        transcactionContract
    });
};



export const TransactionProvider = ({children}) => {
    const [connectedAccount,setConnectedAccount] = useState("");
    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert("Please Install  a MetaMask");
        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log(accounts);
    };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please Install  a MetaMask");

            const accounts = await ethereum.request({method:'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);

        }catch (error){
            console.log(error);
            throw new Error("No Ethereum Object.");
        };
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return(
        <TransactionContext.Provider value = {{connectWallet}} >
            {children}
        </TransactionContext.Provider>
    );

};