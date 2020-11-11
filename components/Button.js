import {useContext} from "react"
import ThemeContext from "../theme/provider"

export default function Button({children, onClick, ...props}) {

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
            }

            img {
              height: 24px;
              width: 24px;
            }
          }
        `}</style>
      </>
  )
}