import Box from "./Box"
import Button from "./Button"
import SelectInput from "./SelectInput"
import Menu from "./Menu"
import {useState, useContext, useEffect} from "react"
import ThemeContext from "../theme/provider"
import {getPrice} from "../pages/api/sol"

export default function Swap({tokens}) {
  const {theme} = useContext(ThemeContext)

  const [loading, useLoading] = useState(false)
  const [reverse, useReverse] = useState(false)
  const [currentChanges, useCurrentChanges] = useState('')

  const [input1, useInput1] = useState({
    value: null,
    addr: tokens[tokens.length - 1].address,
    decimals: tokens[tokens.length - 1].decimals,
    price: ''
  })

  const [input2, useInput2] = useState({
    value: null,
    addr: '',
    decimals: '',
    price: ''
  })

  useEffect(() => {
    if (input1.price && input2.price) {
      calcOff()
    } else {
      calcHandler()
    }
  }, [reverse, currentChanges])

  useEffect(() => {
    calcHandler()
  }, [input1.addr, input2.addr])

  const keyDown = e => {
    if (e.charCode > 47 && e.charCode < 58 || e.charCode === 46 || e.charCode === 44) {
      return true
    } else {
      e.preventDefault()
      return  false
    }
  }

  const changeInput = e => {
    const id = e.target.id
    let value = e.target.value

    if (value.includes('.')) {
      const arr = value.split('')
      const dots = arr.filter(val => val === '.' || val === ',')

      if (dots.length > 1) {
        return
      }
    }

    if (id === '1') {
      useInput1(prev => ({
        ...prev,
        value
      }))
      useCurrentChanges(prev => prev === '1' ? '11' : '1')
    } else if (id === '2') {
      useInput2(prev => ({
        ...prev,
        value
      }))
      useCurrentChanges(prev => prev === '2' ? '22' : '2')
    }
  }

  const setTokenInfo = (addr, dec, id) => {
    if (id === '1') {
      useInput1(prev => ({
        ...prev,
        addr,
        decimals: dec
      }))
    } else if (id === '2') {
      useInput2(prev => ({
        ...prev,
        addr,
        decimals: dec
      }))
    }
  }

  const [menu, useMenu] = useState(false)
  const [menuColor, useMenuColor] = useState(false)

  const [addressesCount, useAddressesCount] = useState([1, 2, 3])

  const addAddress = () => {
    if (addressesCount.length > 6) return
    useAddressesCount(prev => [...prev, prev.length + 1])
  }

  const menuHandler = () => {
    useMenu(prev => !prev)
    useMenuColor(prev => !prev)
  }

  const revertHandler = () => {
    useReverse(prev => !prev)
  }

  const calcHandler = async () => {
    if (input1.addr && input2.addr) {
      if (input1.decimals && input2.decimals) {
        if (input1.value || input2.value) {
          useLoading(true)

          const res = await getPrice(input1.addr, input2.addr, input1.decimals, input2.decimals)
          calcOff(res)

          useLoading(false)
        }
      }
    }
  }

  const maxBalance = async () => {
  }

  const calcOff = (result) => {
    const values = result ? result : [input1.price, input2.price]

    let amount

    if (reverse) {
      if (currentChanges.includes('2')) {
        amount = values[0] * input2.value
        useInput1(prev => ({
          ...prev,
          value: amount,
        }))
      } else if (currentChanges.includes('1')) {
        amount = values[1] * input1.value
        useInput2(prev => ({
          ...prev,
          value: amount,
        }))
      }
    } else {
      if (currentChanges.includes('1')) {
        amount = values[1] * input1.value
        useInput2(prev => ({
          ...prev,
          value: amount,
        }))
      } else if (currentChanges.includes('2')) {
        amount = values[0] * input2.value
        useInput1(prev => ({
          ...prev,
          value: amount,
        }))
      }
    }

    if (result) {
      useInput1(prev => ({
        ...prev,
        price: result[0]
      }))

      useInput2(prev => ({
        ...prev,
        price: result[1]
      }))
    }
  }

  return (
      <>
        <Box title='Swap' menu={true} menuHandler={menuHandler} menuColor={menuColor}>
          <div className='wrapper__inputs'>
            <div className='labels'>
              <label>From</label>
              <label>To</label>
            </div>
            <div className={`swap ${reverse ? 'reverse' : ''}`}>
              <div className='input_comp'>
                <SelectInput
                    tokens={tokens}
                    placeholder='0.000'
                    id='1'
                    isReverse={!reverse}
                    value={input1.value ? input1.value.toString() : ''}
                    change={changeInput}
                    keyDown={keyDown}
                    setInfo={setTokenInfo}
                    className='input__swap'
                    maxBalance={maxBalance}
                />
              </div>
              {
                !loading && theme.name === 'dark'
                    ? <img onClick={revertHandler} src="/arrows.svg" alt="arrows"/>
                    : !loading && theme.name === 'light'
                    ? <img onClick={revertHandler} src="/arrows_light.svg" alt="arrows"/>
                    : <div className="lds-dual-ring"/>
              }

              <div className='input_comp'>
                <SelectInput
                    tokens={tokens}
                    placeholder='Name / Contract'
                    id='2'
                    isReverse={reverse}
                    value={input2.value ? input2.value.toString() : ''}
                    change={changeInput}
                    keyDown={keyDown}
                    setInfo={setTokenInfo}
                    className='input__swap'
                    maxBalance={maxBalance}
                />
              </div>
            </div>
          </div>
          {
            menu && <Menu/>
          }
        </Box>

        <Box title='Private Addresses' alert={true}>
          <div className="wrapper">
            <div className='addresses'>
              {
                addressesCount.map((_, index) => {
                  return <input key={index} type="text" placeholder='0x0000'/>
                })
              }
            </div>
            <div style={{
              margin: '.8rem 0 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}>
              <div>
                <span>
                  {
                    theme.name === 'dark'
                        ? <img className='enc' src='/etoken.svg' alt='etoken'/>
                        : <img className='enc' src='/etoken_light.svg' alt='etoken'/>
                  }&nbsp;</span>
                <span style={{
                  color: theme.swap.addresses.ethColor,
                  textShadow: theme.swap.addresses.ethTextShadow
                }}>&nbsp;0.000</span>
              </div>
              <div onClick={addAddress} className='more'>+&nbsp;<span>More</span></div>
            </div>
            <Button className='button__swap active'>Swap</Button>
          </div>
        </Box>

        <style jsx>{`
          .enc {
            width: 13px;
            height: 17px;
          }

          .swap {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
          }

          .labels {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            min-height: 20px;

            label {
              width: 294px;
              color: ${theme.swap.labelColor};
              text-shadow: ${theme.swap.labelTextShadow};
            }
          }

          .swap.reverse {
            flex-direction: row-reverse;
          }

          .swap img {
            cursor: pointer;
            align-self: flex-start;
            transform: translateY(calc(-50% + 20px));
          }

          img {
            height: 24px;
          }

          form {
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .wrapper {
            margin: 2rem auto 0;
            max-width: 520px;
            display: flex;
            flex-direction: column;
          }

          .addresses {
            display: flex;
            flex-direction: column;

            & input {
              background: transparent;
              outline: none;
              border: 1px solid #bebebe;
              height: 34px;
              color: ${theme.swap.inputTextColor};
              padding: 8px;
              transition: border .2s linear;
              font-size: 22px;

              &:hover {
                border: 1px solid #F48432;
              }

              &:focus {
                border: 1px solid #F48432;
              }

              &::placeholder {
                color: ${theme.swap.addresses.placeholder};
              }
            }

            input + input {
              margin-top: .5rem;
            }
          }

          .more {
            color: ${theme.swap.addresses.moreColor};
            text-shadow: ${theme.swap.addresses.moreTextColor};
            cursor: pointer;

            span {
              text-decoration: underline;
            }
          }

          .lds-dual-ring {
            display: inline-block;

            align-self: flex-start;
            transform: translateY(calc(-50% + 20px));
          }

          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 21px;
            height: 21px;
            border-radius: 50%;
            border: 2px solid #bebebe;
            border-color: #bebebe transparent #bebebe transparent;
            animation: lds-dual-ring 1.2s linear infinite;
          }

          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </>
  )
}