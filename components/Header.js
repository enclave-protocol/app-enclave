import Button from "./Button"
import Image from "next/image"
import {useState, useContext, useEffect} from "react"
import {normalizeAddress, normalizeBalance} from "../utils/helpers"
import ThemeContext from "../theme/provider"
import {connectToMetamask, getAccount, getGasPrice} from "../api/api"
import {getLocalStorage, setLocalStorage} from "../utils/localStorage"
import {AnimatePresence, motion} from "framer-motion"

export default function Header({navHandler, btnStyles}) {

  const {theme, toggleTheme} = useContext(ThemeContext)

  const [connect, useConnect] = useState(null)
  const [balance, useBalance] = useState(null)
  const [gasPrice, useGasPrice] = useState(null)

  const [showAlert, useShowAlert] = useState(false)

  useEffect(() => {
    const getGas = async () => {
      const {fastest} = await getGasPrice()
      const gasPriceInit = fastest / 10
      useGasPrice(gasPriceInit)
    }

    getGas()
  }, [])

  const addressToLabel = connect ? normalizeAddress(connect) : 'Connect wallet'
  const balanceToLabel = balance ? normalizeBalance(balance) : '0.000'

  const connectColor = connect ? theme.header.connectImgAct : theme.header.connectImg

  useEffect(() => {
    const checkConnection = async () => {
      const isConnect = getLocalStorage('connection')
      if (isConnect === 'true') {
        useConnect(await getAccount())
      }
    }

    checkConnection()
  }, [])

  useEffect(() => {
    const accountListener = async () => {
      window.ethereum.on('accountsChanged', async (accounts) => {
        if (!accounts.length) {
          setLocalStorage('connection', false)
          useConnect(null)
        } else {
          setLocalStorage('connection', true)
          useConnect(accounts[0])
        }
      })
    }

    accountListener()
  }, [])

  const connectToWallet = async () => {
    await connectToMetamask()
  }

  const changeTheme = () => {
    setLocalStorage('theme', theme.name === 'dark' ? 'light' : 'dark')
    toggleTheme()
  }

  return (
      <>
        <header>
          <AnimatePresence>
            {
              showAlert && (
                  <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.35}}
                      className='alert-header'
                  >
                    <div className='alert-svg'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.29 3.85999L1.82002 18C1.64539 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9962 3.53002 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.4471 18.6453 22.3547 18.3024 22.18 18L13.71 3.85999C13.5318 3.5661 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6563 2.89725 11.3184 2.98584 11.0188 3.15447C10.7193 3.32311 10.4683 3.5661 10.29 3.85999V3.85999Z"
                            stroke="#6A6A6A" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"/>
                        <path d="M12 9V13" stroke="#6A6A6A" strokeOpacity="0.74" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M12 17H12.01" stroke="#6A6A6A" strokeOpacity="0.74" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                    </div>
                    <div>
                      Your Metamask network doesn't match the Enclave App, please select <span>another network</span>
                    </div>
                  </motion.div>
              )
            }
          </AnimatePresence>
          <div className='left'>
            {
              theme.name === 'dark'
                  ? <a href='/' className='home'>
                    <Image src="/main_dark.svg" alt="logo" width={200} height={200} quality={100}/>
                  </a>
                  : <a href='/' className='home'>
                    <Image src="/main_light.png" alt="logo" width={200} height={200} quality={100}/>
                  </a>
            }
            <div className='gas'>
              {
                theme.name === 'dark'
                    ? <span className='gas__img'><Image src="/gas.svg" alt="gas" width={80} height={80}/></span>
                    : <span className='gas__img'><Image src="/gas_light.svg" alt="gas" width={80} height={80}/></span>
              }
              <span>{gasPrice} GWEI</span>
            </div>
          </div>

          <nav>
            <div>
              <Button onClick={navHandler} className={`button__nav ${btnStyles ? ' active' : ''}`}>Swap</Button>
            </div>
            <div>
              <Button onClick={navHandler} className={`button__nav ${btnStyles ? '' : ' active'}`}>Pool</Button>
            </div>
          </nav>

          <div className='right'>
            <span>
              {
                theme.name === 'dark'
                    ? <img className='enc' src='/etoken.svg' alt='etoken'/>
                    : <img className='enc' src='/etoken_light.svg' alt='etoken'/>
              }
            </span>
            <span className='etoken'>&nbsp;{balanceToLabel}</span>
            <div className='right__btn'>
              <Button onClick={connectToWallet} className='button__connect'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05523 14.413 2.55921 13.47 3.47L11.75 5.18"
                      stroke={connectColor} strokeOpacity="0.77" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
                  <path
                      d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0684 9.05889 10.3533 9.00768C9.63816 8.95646 8.92037 9.05964 8.24861 9.31023C7.57685 9.56082 6.96684 9.95294 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
                      stroke={connectColor} strokeOpacity="0.77" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
                </svg>
                <span className='connect'>{addressToLabel}</span>
              </Button>
            </div>
            <span className='moon'>
              <Image
              onClick={changeTheme}
              src={theme.name === 'dark' ? '/moon.svg' : '/sun.svg'}
              alt={theme.name === 'dark' ? 'moon' : 'sun'}
              width={80}
              height={80}
              />
            </span>
          </div>
        </header>

        <style jsx>{`
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            position: relative;
          }

          .left {
            display: flex;
            align-items: center;
            width: 30%;

            .home {
              width: 94px;
              height: 93px;
            }
          }

          .gas {
            display: flex;
            align-items: center;
          }

          .gas__img {
            width: 36px;
            height: 36px;
          }

          .gas span:first-child {
            margin-left: 62px;
            margin-right: .7rem;
          }

          .gas span:last-child {
            color: ${theme.header.gasColor};
            text-shadow: ${theme.header.gasShadow};
          }

          nav {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;

            div + div {
              margin-left: 3rem;
            }
          }

          .right {
            display: flex;
            align-items: center;

            .enc {
              width: 13px;
              height: 17px;
              margin-right: .25rem;
            }

            span:first-child {
              display: flex;
              align-items: center;
            }
          }

          .connect {
            position: absolute;
            right: ${connect ? '1rem' : '1.5rem'};
            color: ${theme.header.connectBtnColor};
            text-shadow: ${theme.header.connectBtnShadow};
          }

          .etoken {
            color: ${theme.header.ethColor};
            text-shadow: ${theme.header.ethTextShadow};
            margin-right: 1rem;
          }

          svg {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            height: 24px;
            width: 24px;
          }

          .moon {
            display: flex;
            align-items: center;
            margin-left: 1rem;
            cursor: pointer;

            width: 39px;
            height: 39px;
          }

          @media screen and (min-width: 2000px) {
            .gas span:first-child {
              margin-right: .8vw;
            }

            .left {
              .home {
                width: 4.75vw;
                height: 4.75vw;
              }

              .gas__img {
                width: 1.8vw;
                height: 1.8vw;
              }
            }

            .right {
              .enc {
                width: .65vw;
                height: .9vw;
              }
            }

            .moon {
              width: 1.95vw;
              height: 1.95vw;
            }

            svg {
              height: 1.2vw;
              width: 1.2vw;
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            .gas span:first-child {
              margin-right: .6vw;
            }

            .left {
              .home {
                width: 3.8vw;
                height: 3.8vw;
              }

              .gas__img {
                width: 1.5vw;
                height: 1.5vw;
              }
            }

            .right {
              .enc {
                width: .45vw;
                height: .7vw;
              }
            }

            .moon {
              width: 1.5vw;
              height: 1.5vw;
            }

            svg {
              height: 1vw;
              width: 1vw;
            }
          }

          @media screen and (max-width: 1300px) {
            header {
              margin-bottom: 40px;
            }

            .left {
              width: auto;
            }

            nav {
              top: 110%;
            }
          }

          @media screen and (max-width: 900px) {
            .gas {
              & span:first-child {
                margin-left: 30px;
              }
            }
          }

          @media screen and (max-width: 800px) {
            header {
              font-size: 20px;
            }

            .gas {
              & span:first-child {
                display: none;
              }

              & span:last-child {
                margin-left: 20px;
              }
            }
          }

          @media screen and (max-width: 700px) {
            header {
              margin-bottom: 10vh;
            }

            nav {
              position: absolute;
              top: 140px;
            }

            .right__btn {
              position: absolute;
              right: 50%;
              transform: translateX(50%);
              top: 80px;
            }

            .left {
              .home {
                height: 80px;
                width: 80px;
              }
            }
          }

          @media screen and (max-width: 550px) {
            header {
              margin-bottom: 80px;
            }

            .left {
              .home {
                height: 70px;
                width: 70px;
              }
            }

            nav {
              top: 150px;
            }

            .right__btn {
              top: 90px;
            }
          }

          @media screen and (max-width: 450px) {
            nav {
              div + div {
                margin-left: 1.5rem;
              }
            }

            .etoken {
              margin-right: 0;
            }

            .gas {
              span:last-child {
                margin-left: 10px;
              }
            }

            .moon {
              margin-left: 10px;
            }
          }
        `}</style>
      </>
  )
}