import React from "react";
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook,faTwitter,faInstagram,faYoutube} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return(
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div className ="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div className ="flex flex-[0.5] justify-center items-center">
                    <img 
                    src={logo}
                    alt = "logo"
                    className="w-32 "
                    //src = "	https://www.gannett-cdn.com/media/2021/04/03/USATO…dth=660&height=440&fit=crop&format=pjpg&auto=webp"
                    />
                </div>
                <div className ="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <p className = "text-white text-base text-center mx-2 cursor-pointer font-bold italic ">Market</p>
                    <p className = "text-white text-base text-center mx-2 cursor-pointer font-bold italic">Exchange</p>
                    <p className = "text-white text-base text-center mx-2 cursor-pointer font-bold italic ">Tutorials</p>
                    <p className = "text-white text-base text-center mx-2 cursor-pointer font-bold italic ">Wallets</p>

                </div>
            </div>
            <div  className ="flex justify-center items-center flex-col mt-5">
                <p className = "text-white text-sm text-center font-bold">Come  And Join WEB 3.0 Team</p>
                <p className = "text-white text-sm text-center font-bold">nzangimuoki@gmail.com <br/> annanzaga@gmail.com </p>

            </div>

            <div className="text-white flex-col flex-row  cursor-pointer justify-between items-center mt-3">
                <a href = "https://www.twitter.com/NzangiMuoki" className="p-3 space-between color-[#49a1eb]">
                    <FontAwesomeIcon icon = {faTwitter} size = "2x" color = "#49a1eb"/>
                </a>
                <a href="https://www.instagram.com/muokinzangi"
                    className="p-3 space-between">
                    <FontAwesomeIcon icon={faInstagram} size="2x" color = "#fb3958"/>
                </a>
                <a href="https://www.facebook.com/nzangi.muoky/"
                    className="p-3 space-between">
                    <FontAwesomeIcon icon={faFacebook} size="2x"color = '#4968ad' />
                </a>
                <a href="https://www.youtube.com/"
                    className="space-between p-3">
                    <FontAwesomeIcon icon={faYoutube} size="2x" color = "#eb3223"/>
                </a>
            </div>


            <div className = "sm:w-[90%] w-full  h-[0.25px] bg-gray-200 mt-5"/>
            <div className = "sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className = "text-white text-sm text-center font-bold">@DigitalCoin</p>
                <p className = "text-white text-sm text-center font-bold italic text-decoration underline mt-1">Developed By Nzangi Muoki 19/02/2022</p>
                <p className = "text-white text-sm text-center font-bold">All Rights Reserved</p>


            </div>
        </div>
    );
}
export default Footer;