import Box from "./Box"
import Button from "./Button"
import SelectInput from "./SelectInput"
import Menu from "./Menu"
import {useState, useContext, useEffect} from "react"
import ThemeContext from "../theme/provider"
import {getPrice} from "../api/getPrices"
import {connectToMetamask, getERC20Balance, getTokens} from "../api/api"
import PopUp from "./PopUp"

export default function Swap() {
  const {theme} = useContext(ThemeContext)

  const [loading, useLoading] = useState(false)
  const [reverse, useReverse] = useState(false)
  const [currentChanges, useCurrentChanges] = useState('')

  const [tokens, useTokens] = useState(null)

  useEffect(() => {
    const getAllTokens = async () => {
      const {tokens} = await getTokens()
      tokens.push({
        "chainId": 1,
        "address": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        "name": "Ethereum",
        "symbol": "ETH",
        "decimals": 18,
        "logoURI": "https://tokens.1inch.exchange/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"
      })

      useTokens(tokens)
      useInput1(() => ({
        ...input1,
        addr: tokens[tokens.length - 1].address,
        decimals: tokens[tokens.length - 1].decimals
      }))
    }

    getAllTokens()
  }, [])

  const [input1, useInput1] = useState({
    value: null,
    addr: '',
    decimals: '',
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
  const [addresses, useAddresses] = useState({})
  const [length, useLength] = useState(0)
  const [commission, useCommission] = useState('0.0000')

  const [btn, useBtn] = useState(false)
  const [alert, useAlert] = useState(false)

  const addAddress = () => {
    if (addressesCount.length > 21) return
    useAddressesCount(prev => [...prev, prev.length + 1])
  }

  const addressHandler = e => {
    const id = e.target.id - 10
    const value = e.target.value

    if (value.trim().startsWith('0x') && 39 < value.trim().length && 43 > value.trim().length) {
      const _addresses = addresses
      _addresses[id] = value
      useAddresses(_addresses)

      if (isCorrect(_addresses)) useBtn(true)

      useLength(typeof length === 'number' ? Object.keys(_addresses).length.toString() : Object.keys(_addresses).length)
    } else {
      const _addresses = addresses
      if (value.trim()) {
        _addresses[id] = value
        useAddresses(_addresses)
        useBtn(false)
      } else {

        delete _addresses[id]
        useAddresses(_addresses)
        if (Object.keys(_addresses).length) {
          if (isCorrect(_addresses)) useBtn(true)
        }
      }
      useLength(typeof length === 'number' ? Object.keys(_addresses).length.toString() : Object.keys(_addresses).length)
    }
  }

  const isCorrect = (_addresses) => {
    if (Object.keys(_addresses).length) {
      let _isCorrect = []
      Object.values(_addresses).forEach(addr => {
        if (addr.trim().startsWith('0x') && 39 < addr.trim().length && 43 > addr.trim().length) {
          _isCorrect.push(true)
        } else {
          _isCorrect.push(false)
        }
      })

      return _isCorrect.length && !_isCorrect.includes(false)
    }
  }

  useEffect(() => {
    calcCommission()
  }, [btn, length])

  const calcCommission = () => {
    let isCorrect = []
    Object.values(addresses).forEach(addr => {
      if (addr.trim().startsWith('0x') && 39 < addr.trim().length && 43 > addr.trim().length) {
        isCorrect.push(true)
      }
    })

    if (isCorrect.includes(true)) {
      if (isCorrect.length > 1) {
        useCommission((isCorrect.length - 1) * 0.0021)
      } else if (isCorrect.length === 1) {
        useCommission('0.0000')
      }
    }
  }

  const addressFocus = e => {
    e.target.style.borderColor = '#F48432'
  }

  const addressBlur = e => {
    const value = e.target.value

    if (!value.trim()) {
      e.target.style.borderColor = '#bebebe'
      return
    }
    if (value.trim().startsWith('0x') && 39 < value.trim().length && 43 > value.trim().length) {
      e.target.style.borderColor = '#bebebe'
    } else {
      e.target.style.borderColor = 'red'
    }
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
    const isConnect = await connectToMetamask()

    if (!isConnect) {
      return
    }

    if (!reverse) {
      const bal = await getERC20Balance(input1.addr)
      useInput1(prev => ({
        ...prev,
        value: bal
      }))
      useCurrentChanges(prev => prev === '1' ? '11' : '1')
    } else {
      const bal = await getERC20Balance(input2.addr)
      useInput2(prev => ({
        ...prev,
        value: bal
      }))
      useCurrentChanges(prev => prev === '2' ? '22' : '2')
    }
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

  const swapHandler = () => {
    if (btn) {
      useAlert(prev => !prev)
    }
  }

  return (
      <>
        <Box title='Swap' menu={true} menuHandler={menuHandler} menuColor={menuColor}>
          {
            alert &&
            <PopUp
                isPool={true}
                duration={0}
                close={() => useAlert(prev => !prev)}
            />
          }
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
                  return <input
                      onChange={addressHandler}
                      onFocus={addressFocus}
                      onBlur={addressBlur}
                      id={index + 10}
                      key={index}
                      type="text"
                      placeholder='0x0000'
                  />
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
                }}>&nbsp;{commission.toString().slice(0, 6)}</span>
              </div>
              <div onClick={addAddress} className='more'>+&nbsp;<span>More</span></div>
            </div>
            <Button
                onClick={swapHandler}
                className={`button__swap active ${btn ? '' : 'disabled'}`}
            >
              Swap
            </Button>
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

          @media screen and (min-width: 2000px) {
            .enc {
              width: .65vw;
              height: .9vw;
            }

            .swap {
              margin-top: .75vw;
            }

            .labels {
              margin-top: 1.25vw;

              label {
                width: 14.6vw;
              }
            }

            .swap img {
              transform: translateY(calc(-50% + 1vw));
            }

            .lds-dual-ring {
              transform: translateY(calc(-50% + 1vw));
            }

            .lds-dual-ring:after {
              width: 1.15vw;
              height: 1.15vw;
            }

            img {
              height: 1.2vw;
            }

            .wrapper {
              margin: 2.5vw auto 0;
              max-width: 26vw;
            }

            .addresses {
              & input {
                height: 1.7vw;
                font-size: 1.1vw;
                padding: .35vw;
              }

              input + input {
                margin-top: .6vw;
              }
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            .enc {
              width: .45vw;
              height: .6vw;
            }

            .swap {
              margin-top: .5vw;
            }

            .labels {
              margin-top: 1.15vw;

              label {
                width: 11.5vw;
              }
            }

            .swap img {
              transform: translateY(calc(-50% + .8vw));
            }

            .lds-dual-ring {
              transform: translateY(calc(-50% + .8vw));
            }

            .lds-dual-ring:after {
              width: 1vw;
              height: 1vw;
            }

            img {
              height: 1.05vw;
            }

            .wrapper {
              margin: 2.3vw auto 0;
              max-width: 22vw;
            }

            .addresses {
              & input {
                height: 1.4vw;
                font-size: .9vw;
                padding: .25vw;
              }

              input + input {
                margin-top: .45vw;
              }
            }
          }

          @media screen and (max-width: 767px) {
            .labels {
              label {
                width: 34vw;
              }
            }
          }

          @media screen and (max-width: 650px) {
            .wrapper__inputs {
              position: relative;
              width: 290px;
              margin: 0 auto;
            }


            .swap {
              flex-direction: column;
              align-items: center;
            }

            .swap.reverse {
              flex-direction: column-reverse;

              .input_comp:last-child {
                margin-top: 0;
              }

              .input_comp:first-child {
                margin-top: 25px;
              }
            }

            .swap img {
              align-self: center;
              transform: none;
            }

            .lds-dual-ring {
              align-self: center;
              transform: none;
            }

            .input_comp:last-child {
              margin-top: 25px;
            }

            .labels {
              label:first-child {
                position: absolute;
                top: 0;
                left: 0;
              }

              label:last-child {
                position: absolute;
                top: 113px;
                left: 0;
              }
            }
          }

          @media screen and (max-width: 440px) {
            .wrapper__inputs {
              width: 260px;
            }
          }

          @media screen and (max-width: 370px) {
            .wrapper__inputs {
              width: 220px;
            }
          }
        `}</style>
      </>
  )
}