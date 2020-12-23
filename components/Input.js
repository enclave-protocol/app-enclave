import {useContext} from "react"
import ThemeContext from "../theme/provider"

export default function Input({placeholder, children, ...props}) {

  const {theme} = useContext(ThemeContext)

  return (
      <>
        <form onSubmit={e => e.preventDefault()}>
          <input type={props.type ? props.type : 'text'} placeholder={placeholder} {...props} />
          {children}
        </form>

        <style jsx>{`

          .menu {
            width: 290px;
          }

          form {
            display: flex;
            align-items: center;
            position: relative;
          }

          input {
            background-color: transparent;
            outline: none;
            border: 1px solid #bebebe;
            height: 40px;
            color: ${theme.swap.inputTextColor};
            padding: 5px;
            transition: border .2s linear;
            font-size: 22px;
            border-radius: 3px;
            width: 100%;
            -moz-appearance: textfield;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            &::placeholder {
              color: ${theme.swap.placeholderColor};
            }
          }

          input:hover, input:focus {
            border: 1px solid #F48432;
          }

          input.active {
            border: 1px solid #F48432;
          }

          @media screen and (min-width: 2000px) {
            .menu {
              width: 14.5vw;
            }
            
            input {
              height: 2vw;
              font-size: .9vw;
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            .menu {
              width: 11.5vw;
            }

            input {
              height: 1.6vw;
              font-size: .9vw;
            }
          }

          @media screen and (max-width: 820px) {
            .menu {
              width: 33vw;
            }
          }

          @media screen and (max-width: 777px) {
            .menu {
              width: 25vw;
            }
          }

          @media screen and (max-width: 710px) {
            .menu {
              margin-top: 20px;
              width: 34vw;
            }
          }

          @media screen and (max-width: 650px) {
            .menu {
              width: 290px;
            }
          }

          @media screen and (max-width: 435px) {
            .menu {
              width: 260px;
            }
          }

          @media screen and (max-width: 370px) {
            .menu {
              width: 220px;
            }
          }
        `}</style>
      </>
  )
}