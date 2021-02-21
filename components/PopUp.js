import {useState, useRef, useContext, useEffect} from "react"
import Button from "./Button"
import ThemeContext from "../theme/provider"
import {motion} from "framer-motion"

const PopUp = ({close, isPool, duration}) => {

  const ref = useRef(null)
  const {theme} = useContext(ThemeContext)
  const [color, useColor] = useState('#615D5D')

  const closeHandler = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      close()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = '5px'

    return () => {
      document.body.style.overflow = null
      document.body.style.paddingRight = null
    }
  })

  const onEnter = () => {
    useColor('#F48432')
  }

  const onLeave = () => {
    useColor('#615D5D')
  }

  return (
      <>
        <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1, zIndex: '100000'}}
              exit={{opacity: 0}}
              transition={{duration}}
          >
            <section onClick={closeHandler}>
              <div ref={ref}>
                {
                  !isPool && <h3>Connect to a wallet</h3>
                }
                <div className='content'>
                  <svg onClick={close} 
                      onMouseEnter={onEnter} 
                      onMouseLeave={onLeave}
                      viewBox="0 0 14 14" fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      >
                    <path
                        d="M7.77295 6.99925L13.8393 13.0657C14.0529 13.2792 14.0529 13.6255 13.8393 13.8391C13.6258 14.0526 13.2795 14.0527 13.0659 13.8391L6.99951 7.77266L0.933115 13.8391C0.719533 14.0527 0.373252 14.0527 0.159698 13.8391C-0.0538564 13.6255 -0.0538837 13.2792 0.159698 13.0657L6.22609 6.99927L0.159698 0.932857C-0.0538837 0.719275 -0.0538837 0.372993 0.159698 0.159439C0.266475 0.0526619 0.406447 -0.000712395 0.54642 -0.000712395C0.686392 -0.000712395 0.826337 0.0526619 0.933142 0.159439L6.99951 6.22583L13.0659 0.159439C13.1727 0.0526619 13.3126 -0.000712395 13.4526 -0.000712395C13.5926 -0.000712395 13.7325 0.0526619 13.8393 0.159439C14.0529 0.373021 14.0529 0.719302 13.8393 0.932857L7.77295 6.99925Z"
                        fill={color}
                    />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.29 3.86L1.81999 18C1.64536 18.3024 1.55296 18.6453 1.55198 18.9945C1.551 19.3437 1.64148 19.6871 1.81442 19.9905C1.98735 20.2939 2.23672 20.5467 2.5377 20.7239C2.83868 20.901 3.18079 20.9962 3.52999 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86V3.86Z"
                        stroke={theme.icon.menu}
                        strokeOpacity="0.74"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 9V13"
                        stroke={theme.icon.menu}
                        strokeOpacity="0.74"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 17H12.01"
                        stroke={theme.icon.menu}
                        strokeOpacity="0.74"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                  </svg>
                  {
                    isPool ? <h2>Not available in Alpha version</h2> : <h4>Metamask extension is not installed</h4>
                  }
                </div>
                {
                  isPool &&
                  <Button
                      className='button__modal'
                      onClick={() => window.open('', '_blanc')}
                  >
                    JOIN BETA TEST
                  </Button>
                }
                {
                  !isPool &&
                  <Button
                      className='button__modal'
                      onClick={() => window.open('', '_blanc')}
                  >
                    DOWNLOAD
                  </Button>
                }
              </div>
            </section>
        </motion.div>

        <style jsx>{`
          section {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(36, 36, 36, 0.51);
            z-index: 1000;
            
            > div {
              background: ${theme.card.bg};
              box-shadow: ${theme.card.boxShadow};
              border-radius: 19px;
              padding: 1rem 1rem;
              width: 575px;
              height: 250px;

              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;

              position: relative;

              h2 {
                font-size: 32px;
                font-weight: 400;
              }
            }
          }

          .content {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2rem auto 1.5rem;

            svg:nth-child(2) {
              margin-top: 3px;
              margin-right: 15px;

              width: 30px;
              height: 30px;
            }

            svg:first-child {
              position: absolute;
              top: 20px;
              right: 20px;

              width: 14px;
              height: 14px;

              cursor: pointer;
            }
          }

          @media screen and (min-width: 2000px) {
            section {
              > div {
                width: 28.75vw;
                height: 12.5vw;
                border-radius: 1vw;

                h2 {
                  font-size: 1.6vw;
                }
              }
            }

            .content {
              margin: 2.5vw auto 1.8vw;

              svg:nth-child(2) {
                margin-top: .1vw;
                margin-right: .75vw;

                width: 1.5vw;
                height: 1.5vw;
              }

              svg:first-child {
                top: 1vw;
                right: 1vw;

                width: .7vw;
                height: .7vw;
              }
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            section {
              > div {
                width: 26vw;
                height: 11vw;
                border-radius: .75vw;

                h2 {
                  font-size: 1.3vw;
                }
              }
            }

            .content {
              margin: 2.3vw auto 1.6vw;

              svg:nth-child(2) {
                width: 1.3vw;
                height: 1.3vw;
              }

              svg:first-child {
                top: .8vw;
                right: .8vw;
                width: .6vw;
                height: .6vw;
              }
            }
          }

          @media screen and (max-width: 620px) {
            section {
              > div {
                width: 450px;
                text-align: center;

                h2 {
                  font-size: 26px;
                }
              }
            }

            .content {
              svg:nth-child(2) {
                margin-top: 0;
              }
            }
          }

          @media screen and (max-width: 500px) {
            section {
              > div {
                width: 350px;
              }
            }

            .content {
              flex-direction: column;
              margin: .5rem auto 1rem;

              svg:nth-child(2) {
                margin-bottom: 10px;
                margin-right: 0;
              }
            }
          }

          @media screen and (max-width: 500px) {
            section {
              > div {
                width: 300px;
              }
            }
          }
        `}</style>
      </>
  )
}

export default PopUp