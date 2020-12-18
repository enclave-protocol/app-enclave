import {useState, useContext} from "react"
import ThemeContext from "../theme/provider"
import {motion, AnimatePresence} from "framer-motion"

export default function Box({children, title, menu, alert, menuColor, menuHandler, ...props}) {
      const {theme} = useContext(ThemeContext)

      const svgColor = menuColor ? '#F48432' : theme.icon.menu

      const [alertShow, useAlertShow] = useState(false)
    
      const alertEnterHandler = () => {
        useAlertShow(true)
      }
    
      const alertLeaveHandler = () => {
        useAlertShow(false)
      }
    
      return (
          <>
            <section>
              <div  {...props}>
                <h2>{title}</h2>
    
                {
                  menu &&
                  (
                      <svg onClick={menuHandler} width="30" height="30" viewBox="0 0 30 30" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i)">
                          <path d="M5 26.25V17.5" stroke={svgColor} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M5 12.5V3.75" stroke={theme.icon.menu} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M15 26.25V15" stroke={theme.icon.menu} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M15 10V3.75" stroke={svgColor} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M25 26.25V20" stroke={svgColor} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M25 15V3.75" stroke={theme.icon.menu} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M1.25 17.5H8.75" stroke={svgColor} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M11.25 10H18.75" stroke={svgColor} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                          <path d="M21.25 20H28.75" stroke={svgColor} strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round"/>
                        </g>
                        <defs>
                          <filter id="filter0_i" x="0" y="0" width="30" height="34" filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                           result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
                          </filter>
                        </defs>
                      </svg>
                  )
                }
    
                {
                  alert && (
                      <>
                        <svg onMouseEnter={alertEnterHandler} onMouseLeave={alertLeaveHandler}
                             viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M10.29 3.86L1.81999 18C1.64536 18.3024 1.55296 18.6453 1.55198 18.9945C1.551 19.3437 1.64148 19.6871 1.81442 19.9905C1.98735 20.2939 2.23672 20.5467 2.5377 20.7239C2.83868 20.901 3.18079 20.9962 3.52999 21H20.47C20.8192 20.9962 21.1613 20.901 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86V3.86Z"
                              stroke={alertShow ? '#F48432' : theme.icon.menu} strokeOpacity="0.74" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 9V13" stroke={theme.icon.menu} strokeOpacity="1" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 17H12.01" stroke={theme.icon.menu} strokeOpacity="0.74" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        <AnimatePresence>
                          {
                            alertShow && (
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: .2}}
                                    className={`alert ${theme.name === 'light' ? 'light' : ''}`}
                                >
                                  <span>Not available in Alpha version</span>
                                </motion.div>
                            )
                          }
                        </AnimatePresence>
                      </>
                  )
                }
              </div>
              <div>
                {children}
              </div>
            </section>
    
            <style jsx>{`
              section {
                background: ${theme.card.bg};
                box-shadow: ${theme.card.boxShadow};
                border-radius: 19px;
                padding: 1.3rem 2rem;
    
                & + & {
                  margin-top: 25px;
                }
              }
    
              div:first-child {
                text-align: center;
                position: relative;
    
                h2 {
                  font-size: 36px;
                  font-weight: 400;
                  color: ${theme.header.gasColor};
                  text-shadow: ${theme.header.gasShadow};
                }
    
                svg {
                  position: absolute;
                  top: 5px;
                  transform: translate3d(5%, 5%, 0);
                  right: 5px;
                  cursor: pointer;
                  z-index: 1000;
    
                  width: 30px;
                  height: 30px;
                }
              }

              @media screen and (max-width: 600px) {
                section {
                  h2 {
                    max-width: 200px;
                    margin: 0 auto;
                  }
                }
              }
    
              @media screen and (min-width: 2000px) {
                section {
                  padding: 1.6vw 2.4vw;
                  border-radius: 1vw;
                  
                  & + & {
                    margin-top: 1.25vw;
                  }
                }
    
                div:first-child {
                  h2 {
                    font-size: 1.8vw;
                  }
    
                  svg {
                    width: 1.5vw;
                    height: 1.5vw;
                  }
                }
              }
            `}</style>
          </>
      )
    }
