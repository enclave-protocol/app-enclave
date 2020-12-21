import {useState, useCallback, useRef, useContext, useEffect} from "react"
import ThemeContext from "../theme/provider"

export default function SelectInput({tokens, id, isReverse, value, change, setInfo, maxBalance, className, keyDown}) {

  const {theme} = useContext(ThemeContext)
  
  const ref = useRef(null)
  const searchRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const [token, useToken] = useState(id === '1' ? tokens[tokens.length - 1].symbol : '')
  const [logo, useLogo] = useState(id === '1' ? tokens[tokens.length - 1].logoURI : '')

  useEffect(() => {
    if (active) searchRef.current.focus()
    if (searchRef.current) {
      window.addEventListener('mousedown', onClick)
    }

    return () => {
      window.removeEventListener('mousedown', onClick)
    }
  }, [active])

  const onChange = useCallback(event => {
    const query = event.target.value
    setQuery(query)

    if (query.length < 1) {
      setResults(tokens.slice(0, 30).sort((a, b) => a.symbol.localeCompare(b.symbol)))
    } else {
      const names = tokens
          .filter(el => el.symbol.toLowerCase().includes(query.toLowerCase()))
          .sort((a, b) => a.symbol.localeCompare(b.symbol))
          .slice(0, 30)
      const addresses = names
          .concat(tokens.filter(el => el.address.toLowerCase().includes(query.toLowerCase())))
          .slice(0, 30)

      setResults(addresses)
    }
  }, [])

  const onClick = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      if (event.target.id === 'svg' || event.target.id === 'path') {
        return
      }
      setActive(() => false)
    }
  }

  const openDropdown = () => {
    setActive(prev => !prev)
    setResults(tokens.slice(0, 30).sort((a, b) => a.symbol.localeCompare(b.symbol)))
  }

  return (
      <>
        <div>
          <div className={`form + ${className}`}>
            <form onSubmit={e => e.preventDefault()}>
              <div className='inputbox'>
                <input
                    onInput={change}
                    type="text"
                    placeholder={id === '1' ? '0.000' : ''}
                    className='search'
                    value={value.replace(',', '.')}
                    id={`${id}`}
                    style={{width: `${!token && !logo ? '100%' : '61.2%'}`}}
                    onKeyPress={keyDown}
                />
                <div>
                  {
                    token && <a>{token ? token : 'ETH'}</a>
                  }

                  {
                    logo && <img src={logo} alt="token"/>
                  }

                  <svg ref={ref} onClick={openDropdown} id='svg' viewBox="0 0 14 8" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path id='path' d="M1 1L7 7L13 1" stroke={theme.icon.select} strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {
            active &&

            <div className='search__wrapper' ref={searchRef}>
              <div>
                <img onClick={() => searchRef.current.childNodes[0].childNodes[1].focus()} src='/search.svg' alt='search'/>
                <input
                    onChange={onChange}
                    value={query}
                    type="text"
                    placeholder='Name / Contract'
                    className=''
                />
              </div>

              <ul className='results'>
                {results.map(el => (
                      <li className='result' key={el.address + el.symbol} onClick={() => {
                        useToken(el.symbol)
                        useLogo(el.logoURI)
                        setQuery('')
                        setActive(false)
                        setInfo(el.address, el.decimals, id)
                      }}>
                        <img src={el.logoURI} alt={el.symbol}/>
                        <a>{el.symbol}</a>
                      </li>
                  ))}
              </ul>
            </div>
          }

          <div className='wrapper__btn'>
            {
              isReverse && <a className='btn' onClick={maxBalance}>max</a>
            }
          </div>
        </div>

        <style jsx>{`
          div {
            position: relative;

            label {
              color: ${theme.swap.labelColor};
              text-shadow: ${theme.swap.labelTextShadow};

              &:last-child {
                margin-top: 7px;
                font-size: 18px;
              }
            }
          }

          .inputbox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;

            div {
              display: flex;
              align-items: center;

              svg {
                cursor: pointer;
                margin-left: 13px;
                margin-right: 13px;
                width: 14px;
                height: 8px;
              }
            }
          }

          .form {
            border: 1px solid rgba(190, 190, 190, 1);
            transition: border .2s linear;
            border-radius: 3px;
            position: relative;
            height: 40px;

            &:hover, &:focus-within {
              border: 1px solid #F48432;
            }

            img {
              border-radius: 50%;
              height: 22px;
              width: 22px;
            }

            a {
              margin-right: 25px;
              font-size: 18px;

              position: absolute;
              top: 50%;
              transform: translateY(-52%);
              right: 50px;
            }
          }

          .wrapper__btn {
            display: flex;
            justify-content: flex-end;
            height: 25px;
          }

          .btn {
            position: absolute;
            left: 1px;
            bottom: 0;
            font-size: 16px;
            text-decoration: underline;
            cursor: pointer;
            color: ${theme.swap.maxColor};
          }

          .right {
            position: absolute;
            right: 1px;
            bottom: 0;
          }

          .left {
            position: absolute;
            left: 1px;
            bottom: 0;
          }

          .search {
            padding: 13px;
            outline: none;
            background-color: transparent;
            border: 0;
            height: 40px;
            font-size: 22px;
            width: 60%;
            color: ${theme.swap.inputTextColor};

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            &::placeholder {
              color: ${theme.swap.placeholderColor};
            }
          }

          .search__wrapper {
            position: absolute;
            top: 40px;
            left: 0;
            right: .5px;
            z-index: 1110;
            overflow-y: auto;
            max-height: 388px;
            background: ${theme.dropdown.dropdownColor};
            box-shadow: ${theme.dropdown.dropdownShadow};
            
            img {
              height: 40px;
              width: 18px;
            }

            &::-webkit-scrollbar {
              width: 2px;
            }

            &::-webkit-scrollbar-track {
              background: transparent;
            }

            &::-webkit-scrollbar-thumb {
              background-color: ${theme.dropdown.fontColor};
              border-radius: 5px;
            }

            div:first-child {
              margin: .2rem .5rem;
              display: flex;
              align-self: center;
            }

            input {
              padding: 8px;
              outline: none;
              background-color: transparent;
              border: 0;
              height: 40px;
              font-size: 18px;
              color: ${theme.swap.inputTextColor};
              width: 98%;

              &::placeholder {
                text-align: left;
              }
            }
          }

          .results {
            list-style: none;
            font-size: 18px;
            padding: 0;
            margin: 0;
          }

          .result {
            font-size: inherit;
            cursor: pointer;
            color: ${theme.dropdown.fontColor};
            transition: color .2s linear;
            display: flex;
            padding: .2rem .5rem;

            &:hover {
              background: ${theme.dropdown.hoverColor};
              box-shadow: ${theme.dropdown.hoverShadow};
            }

            img {
              width: 18px;
              height: 18px;
              border-radius: 50%;
              margin-right: 8px;
            }

            a {
              font-size: inherit;
              transition: color .2s linear;
            }
          }

          .input__swap {
            width: 290px;
          }

          @media screen and (min-width: 2000px) {
            .inputbox {
              div {
                svg {
                  margin-left: .65vw;
                  margin-right: .65vw;
                  width: .8vw;
                  height: .4vw;
                }
              }
            }

            .form {
              height: 2vw;

              img {
                height: 1.1vw;
                width: 1.1vw;
              }

              a {
                margin-right: 1.25vw;
                font-size: .9vw;
                right: 2.5vw
              }
            }

            .btn {
              font-size: .8vw;
            }

            .search {
              padding: 0.65vw;
              height: 2vw;
              font-size: 1.1vw;
            }

            .search__wrapper {
              top: 2vw;
              max-height: 19.5vw;
              
              img {
                height: 2vw;
                width: .9vw;
              }

              div:first-child {
                margin: .3vw .5vw;
              }

              input {
                padding: .45vw;
                height: 2vw;
                font-size: .9vw;
              }
            }

            .results {
              font-size: .9vw;
            }

            .result {
              padding: .25vw .6vw;

              img {
                width: .9vw;
                height: .9vw;
                margin-right: .4vw;
              }
            }

            .wrapper__btn {
              height: 1.25vw;
            }

            .input__swap {
              width: 14.6vw;
            }
          }

          @media screen and (max-width: 767px) {
            .input__swap {
              width: 34vw;
            }
          }

          @media screen and (max-width: 650px) {
            .input__swap {
              width: 290px;
            }
          }

          @media screen and (max-width: 380px) {
            .input__swap {
              width: 260px;
            }
          }

          @media screen and (max-width: 370px) {
            .input__swap {
              width: 220px;
            }
          }
        `}</style>
      </>
  )
}
