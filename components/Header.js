import Button from "./Button"
import Image from "next/image"
import {useState, useContext} from "react"
import {normalizeAddress, normalizeBalance} from "../utils/helpers"
import ThemeContext from "../theme/provider"
import {connectToMetamask, getAccount} from "../pages/api/api"
import {getLocalStorage, setLocalStorage} from "../utils/localStorage"

export default function Header({gasPriceInit, navHandler, btnStyles}) {

  const {theme, toggleTheme} = useContext(ThemeContext)

  const [connect, useConnect] = useState(null)
  const [balance, useBalance] = useState(null)
  const [gasPrice, useGasPrice] = useState(gasPriceInit)

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
        `}</style>
      </>
  )
}