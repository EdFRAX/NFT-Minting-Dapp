import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
box-sizing: border-box;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
background-color: rgba(255,255,255,0.1);
border: 2px solid transparent;
border-radius: var(--btn-radius);
cursor: pointer;
display: flex;
align-self: center;
font-size: 1rem;
font-weight: 400;
line-height: 1;
margin: 20px;
padding: 1.2em 2.8em;
text-decoration: none;
text-align: center;
text-transform: uppercase;
font-weight: 700;
border-color: var(--btn-color);
border-image-source:linear-gradient(0deg, var(--btn-back-primary), var(--btn-back-secondary));
color: var(--btn-text);
box-shadow: 0 0 40px 40px var(--btn-color) inset, 0 0 0 0 var(--btn-color);
transition: all 150ms ease-in-out;
  :hover,:focus {
  color: var(--btn-text-hover);
  outline: 0;
  box-shadow: 0 0 10px 0 var(--btn-color) inset, 0 0 10px 4px var(--btn-color);
}

`;

export const StyledRoundButton = styled.button`
box-sizing: border-box;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
background-color: rgba(255,255,255,0);
border: 2px solid transparent;
border-radius: var(--btn-sec-radius);
cursor: pointer;
display: flex;
align-self: center;
font-size: 20px;
font-weight: 700;
line-height: 1;
margin: 20px;
padding: 1.2em 2.8em;
text-decoration: none;
text-align: center;
text-transform: uppercase;
font-weight: 700;
border-color: transparent;
color: var(--btn-sec-text);
transition: all 150ms ease-in-out;
`;


export const ResponsiveWrapper = styled.div`
  width: 90%;
  position: relative;
  max-width: 800px;
  margin: auto;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 25px;
  height: 400px;
  transition: all 0.3s;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  @media (min-width: 767px) {
    width:65%;
    flex-direction:row;
    margin-top:0px;
    right:-5%;
  }
  @media (min-width: 1067px) {
    right:0%;
  }
`;

export const StyledLogo = styled.img`
  width: var(--logo);
  margin-bottom:200px;
  border-radius:50%;
  @media (min-width: 767px) {
    width: var(--logo);
    margin-bottom:50px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.div`
  
  flex-shrink: 0;
  z-index:10;
  height: var(--img-size);
  background: url("/config/images/1.gif") no-repeat;
  background-size:cover;
  background-repeat:no-repeat;
  background-color:#000000;
  border-radius: 20px;
  overflow: hidden;
  border-radius:var(--img-radius);
  width: var(--img-size);
  position:absolute;
  margin-bottom:150px;
  @media (min-width: 767px) {
    transform: translateX(-100px);
    margin-bottom:0px;
  }
  transition: width 0.5s;
    
    
    :nth-child(2){
      opacity:var(--animation-showhide);
      width:calc(var(--img-size)*1.03);
      height:calc(var(--img-size)*1.03);
      background-image:linear-gradient(0deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      z-index:8;
      animation: var(--animation) 1.5s linear infinite;
    }
    :nth-child(3){
      opacity:var(--animation-shadow);
      z-index:6;
      width:calc(var(--img-size)*1.02);
      height:calc(var(--img-size)*1.02);
      background-image:linear-gradient(0deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      filter:blur(15px);
      animation: var(--animation) 1.5s linear infinite;
    }
    @keyframes spin {
      0% {
        background-image:linear-gradient(0deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      10% {
        background-image:linear-gradient(36deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      20% {
        background-image:linear-gradient(72deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      30% {
        background-image:linear-gradient(108deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      40% {
        background-image:linear-gradient(144deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      50% {
        background-image:linear-gradient(180deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      60% {
        background-image:linear-gradient(216deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      70% {
        background-image:linear-gradient(252deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      80% {
        background-image:linear-gradient(288deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      90% {
        background-image:linear-gradient(324deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
      100% {
        background-image:linear-gradient(360deg, var(--img-animation-primary) 0%, var(--img-animation-secondary) 74%);
      }
    }
`;

export const StyledLink = styled.a`
  color: var(--wallet-text);
  text-decoration: none;
`;


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 50) {
      newMintAmount = 50;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{backgroundImage: "linear-gradient(var(--bg-angle), var(--primary) 0%, var(--secondary) 74%)"}}>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24 }}
      >
        <a href={CONFIG.MARKETPLACE_LINK}>
          <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
        </a>
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{backgroundImage:"linear-gradient(var(--main-angle), var(--main-bg-primary) 0%, var(--main-bg-secondary) 74%)", padding: 24, borderRadius:"var(--main-rarius)",}} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg/><StyledImg/><StyledImg/>
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              padding: 24,
              borderRadius: 24,
              marginTop:40,
              
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--main-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--wallet-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription>
            <span
              style={{
                textAlign: "center",
              }}
            >
              <StyledButton
                style={{
                  margin: "5px",
                }}
                onClick={(e) => {
                  window.open(CONFIG.MARKETPLACE_LINK, "_blank");
                }}
              >
              {CONFIG.MARKETPLACE}
              </StyledButton>
            </span>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--main-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--main-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--main-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--main-text)" }}
                >
                  Excluding gas fees.
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--alert-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--main-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--alert-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--main-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "MINTING..." : "MINT"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME}) and the correct address.
            Please note: Once you make the purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            successfully mint your NFT. We recommend that you don't lower the
            gas limit.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
           COPYRIGHT © {CONFIG.YEAR} <span style={{color:"var(--owner)"}}>{CONFIG.OWNER}</span>
           </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
