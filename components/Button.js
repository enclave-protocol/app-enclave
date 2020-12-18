import {useContext} from "react"
import ThemeContext from "../theme/provider"

export default function Button({children, onClick, color, textShadow, ...props}) {

  const {theme} = useContext(ThemeContext)

  return (
      <>
        <button onClick={onClick} {...props}>
          {children}
        </button>

        <style jsx>{`
          button {
            position: relative;
            background: ${theme.button.bg};
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.42);
            border-radius: 19px;
            padding: .3rem 0;
            border: none;
            outline: none;
            font-size: 24px;
            transition: color .2s linear, background .2s linear;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            color: ${!color ? theme.header.btnColor : color};
            text-shadow: ${!textShadow ? theme.header.btnShadow : textShadow};
            
            &.all {
              width: 72px;
              height: 45px;
              border-radius: 16px;
            }

            &:hover {
              color: #F48432;
            }

            &.button__swap {
              width: 216px; 
              margin: 0 auto; 
              border-radius: 7px;
            }

            &.button__nav {
              width: 114px;
            }

            &.button__connect {
              width: 265px;
              height: 41px;
            }

            &.active {
              color: #FFFFFF;
              background: ${theme.button.bgActive};
              box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.42);
              text-shadow: none;

              &:hover {
                color: gray;
              }

              &.all {
                background: linear-gradient(89.95deg, #FD9D57 0.04%, #F680A8 99.95%);
                text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
              }
            }

            img {
              height: 24px;
              width: 24px;
            }
          }

          .button__modal {
            color: ${theme.pool.btnColor};
            text-shadow: ${theme.pool.btnTextShadow};
            border-radius: 7px;
            width: 230px;
            height: 40px;
          }

          .button__pool {
            color: ${theme.pool.btnColor};
            text-shadow: ${theme.pool.btnTextShadow};
            width: 260px;
            border-radius: 7px;
            margin: 0 auto;
          }

          .section__btns {
            width: 72px;
            height: 41px;

            & + & {
              margin-left: 1rem;
            }
          }

          .section__btns-pool {
            width: 116px;
            height: 35px;
            font-size: 18px;
            justify-content: flex-start;

            & + & {
              margin-left: 1rem;
            }
          }

          @media screen and (min-width: 2000px) {
            button {
              font-size: 1.2vw;
              padding: .37vw 0;
              border-radius: 1vw;

              &.all {
                width: 3.6vw;
                height: 2.2vw;
                border-radius: .8vw;
              }

              &.button__nav {
                width: 5.7vw;
              }

              &.button__connect {
                width: 13.25vw;
                height: 2.05vw;
              }
              
              &.button__swap {
              width: 10.85vw;
              border-radius: .3vw;
            }

              img {
                height: 1.2vw;
                width: 1.2vw;
              }
            }

            .button__modal {
              width: 11.4vw;
              height: 2vw;
              border-radius: .3vw
            }

            .button__pool {
              width: 13vw;
              border-radius: .3vw;
            }

            .section__btns {
              width: 3.6vw;
              height: 2.05vw;
            }

            .section__btns-pool {
              width: 5.8vw;
              height: 1.8vw;
              font-size: .9vw;
            }
          }

          @media screen and (max-width: 767px) {
            .section__btns-pool {
              & + & {
                margin-left: 0;
              }
            }
          }

          @media screen and (max-width: 450px) {
            .all {
              margin-top: 1rem;
            }

            .section__btns {
              width: 57px;
              height: 40px;

              & + & {
                margin-left: .5rem;
              }
            }
          }

          @media screen and (max-width: 350px) {
            .button__pool {
              width: 230px;
              font-size: 20px;
            }
          }
        `}</style>
      </>
  )
}