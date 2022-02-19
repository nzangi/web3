import logo from '../../images/logo.png';

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
            <div className = "sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5"/>
            <div className = "sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p className = "text-white text-sm text-center font-bold">@DigitalCoin</p>
                <p className = "text-white text-sm text-center font-bold italic text-decoration underline mt-2">Developed By Nzangi Muoki 19/02/2022</p>
                <p className = "text-white text-1xl text-sm text-center font-bold ">All Rights Reserved</p>


            </div>
        </div>
    );
}
export default Footer;