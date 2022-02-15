import React, {useEffect,useState} from 'react';
import {ethers} from 'ethers';
import { contractABI,contractAddress} from '../utilis/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transcactionContract = new ethers.Contract(contractAddress,contractABI,signer);
    return transcactionContract;
};



export const TransactionProvider = ({children}) => {
    const [formData,setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''});
    const [currentAccount,setCurrentAccount] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [transactionCount,setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState,[name]: e.target.value}));

    };
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please Install  a MetaMask");

            const accounts = await ethereum.request({method: 'eth_accounts'});
            console.log(accounts);
            if (accounts.length){
                setCurrentAccount(accounts[0]);
                //getAllTransactions();
            }else {
                console.log(error);
                console.log("No Accounts Found.");
            }
            
           } 
           catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object.");
            
        }   
    };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please Install  a MetaMask");

            const accounts = await ethereum.request({method:'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);

        }catch (error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    };

    const sendTransaction = async () => {
        try {
            if(ethereum){
            //get data from the form..
            const {addressTo,amount,keyword,message} = formData;
            const  transcactionContract =   getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to:addressTo,
                    gas:"0x5208", //2100GWEI
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await transcactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
            setIsLoading(true);
            console.log('Loading- ${transactionHash.hash}');
            await transactionHash.wait();
            setIsLoading(false);
            console.log("Success- ${transactionHash.hash}");

            const transactionCount = await transcactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            
            }else{
                console.log("No ethereum object");}
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object.");
        }

    };

    useEffect(() => {
        checkIfWalletIsConnected();
    },[]);

    return(
        <TransactionContext.Provider value = {{connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction}} >
            {children}
        </TransactionContext.Provider>
    );

};