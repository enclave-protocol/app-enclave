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
        `}</style>
      </>
  )
}