import Button from "./Button"
import Input from "./Input"
import {useState, useContext, useEffect} from "react"
import ThemeContext from "../theme/provider"

export default function Menu() {

  const {theme} = useContext(ThemeContext)

  const [slipInput, useSlipInput] = useState('')
  const [delInput, useDelInput] = useState('')

  const [slippage, useSlippage] = useState('0.1')
  const [delay, useDelay] = useState('Off')

  const [pool, usePool] = useState({
    1: true,
    2: false,
    3: false,
    4: false
  })

  const [all, useAll] = useState(false)

  useEffect(() => {
    let isAll = []

    for (let key in pool) {
      isAll.push(pool[key])
    }

    if (isAll.includes(false)) {
      useAll(false)
    } else {
      useAll(true)
    }
  }, [pool])

  const allHandler = () => {
    let newPool = []

    if (!all) {
      for (let key in pool) {
        newPool[key] = true
      }
    } else {
      for (let key in pool) {
        newPool[key] = false
      }
    }
    usePool(() => ({
      ...newPool
    }))
    useAll(prev => !prev)
  }

  const poolHandler = e => {
    const target = e.currentTarget.id

    if (all) {
      useAll(false)
    }

    usePool(prev => ({
      ...prev,
      [target]: !prev[target]
    }))
  }

  const slippageHandler = e => {
    const target = e.target.textContent

    useSlippage(target)
  }

  const delayHandler = e => {
    const target = e.target.textContent

    useDelay(target)
  }

  const changeSlippage = e => {
    const value = e.target.value

    useSlipInput(value)

    if (value.trim()) {
      useSlippage(value)
    }
  }

  const blurSlippage = e => {
    const value = e.target.value

    if (!value.trim() || value === '00' || value === '0') {
      useSlippage('0.1')
    } else {
      useSlippage(value)
    }
  }

  const changeDelay = e => {
    const value = e.target.value

    useDelInput(value)

    if (value.trim()) {
      useDelay(value)
    }
  }

  const blurDelay = e => {
    const value = e.target.value

    if ((value === '0' || !value.trim()) || value.toLowerCase() === 'off') {
      useDelay('Off')
    } else if (value.toLowerCase() === 'vrf') {
      useDelay('VRF')
    } else {
      useDelay(value)
    }
  }

  const slippageColor = slippage === '0.1' ? '' : slippage === '0.5' ? '' : slippage === '1' ? '' : slippage === '3' ? '' : 'active'
  const delayColor = delay === 'Off' ? '' : delay === 'VRF' ? '' : delay === '10' ? '' : delay === '20' ? '' : 'active'

  return (
      <>
        <div className='section first'>
        <div style={{color: theme.swap.choiceColor}}>Slippage tolerance, <b style={{fontSize: '1.15rem'}}>%</b></div>
          <div className='wrapper'>
            <div className='section__btns'>
              <Button
                  onClick={slippageHandler}
                  className={`section__btns ${slippage === '0.1' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >0.1</Button>
              <Button
                  onClick={slippageHandler}
                  className={`section__btns ${slippage === '0.5' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >0.5</Button>
              <Button
                  onClick={slippageHandler}
                  className={`section__btns ${slippage === '1' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >1</Button>
              <Button
                  onClick={slippageHandler}
                  className={`section__btns ${slippage === '3' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >3</Button>
            </div>
            <Input 
                onChange={changeSlippage}
                onBlur={blurSlippage}
                className={slippageColor + ' menu'}
                value={slipInput}
                placeholder='Custom' 
                type='number' 
            />
          </div>
        </div>

        <div className='section'>
        <div style={{color: theme.swap.choiceColor}}>Delay <b style={{fontSize: '1.15rem'}}>t</b> block</div>
          <div className='wrapper'>
            <div className='section__btns'>
              <Button
                  onClick={delayHandler}
                  className={`section__btns ${delay === 'Off' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >Off</Button>
              <Button
                  onClick={delayHandler}
                  className={`section__btns ${delay === 'VRF' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >VRF</Button>
              <Button
                  onClick={delayHandler}
                  className={`section__btns ${delay === '10' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >10</Button>
              <Button
                  onClick={delayHandler}
                  className={`section__btns ${delay === '20' && 'active'}`}
                  color={theme.swap.btnColor}
                  textShadow={theme.swap.btnTextShadow}
              >20</Button>
            </div>
            <Input 
                onChange={changeDelay}
                onBlur={blurDelay}
                className={delayColor + ' menu'}
                value={delInput}
                placeholder='Custom' 
            />
          </div>
        </div>

        <div className='section'>
        <div style={{color: theme.swap.choiceColor}}>Available pool</div>
          <div className='wrapper wrapper-pool'>
            <div className='section__btns-pool'>
              <Button
                  onClick={poolHandler}
                  id='1'
                  className={`section__btns-pool ${pool[1] ? 'active' : ''}`}
              >
                <img className='enc' src='/etoken_pool.svg' alt='enclave'/>
                Enclave
              </Button>
              <Button
                  onClick={poolHandler}
                  id='2'
                  className={`section__btns-pool ${pool[2] ? 'active' : ''}`}
              >
                <img src='/uni.svg' alt='uni'/>
                Uni V2
              </Button>
              <Button
                  onClick={poolHandler}
                  id='3'
                  className={`section__btns-pool ${pool[3] ? 'active' : ''}`}
              >
                <img src='/1inch.svg' alt='1inch'/>
                1inch
              </Button>
              <Button
                  onClick={poolHandler}
                  id='4'
                  className={`section__btns-pool ${pool[4] ? 'active' : ''}`}
              >
                <img src='/balancer.svg' alt='balancer'/>
                Balancer
              </Button>
            </div>
            <Button
                onClick={allHandler}
                className={all ? 'active all' : 'all'}
            >All</Button>
          </div>
        </div>

        <style jsx>{`
          img {
            height: 17px;
            margin-right: 8px;
          }

          .section {
            margin-top: 50px;

            &.first {
              margin-top: 65px;
            }
          }

          .section__btns {
            display: flex;
            justify-content: space-between;
          }

          .section__btns-pool {
            display: flex;
            flex-wrap: wrap;
            max-width: 560px;

            img {
              height: 20px;
              margin-left: 10px;
              margin-right: 6px;
              
              &.enc {
                height: 16px;
              }
            }
          }

          .wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: .5rem;
          }

          @media screen and (min-width: 2000px) {
            .section__btns-pool {
              max-width: none;

              img {
                height: 1vw;
                margin-left: .6vw;
                margin-right: .25vw;
                
                &.enc {
                height: .8vw;
                }
              }
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            .section__btns-pool {
              img {
                height: .7vw;
                margin-left: .4vw;
                margin-right: .25vw;

                &.enc {
                  height: .66vw;
                }
              }
            }
          }

          @media screen and (max-width: 767px) {
            .section__btns-pool {
              width: 300px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 1rem;
              grid-row-gap: 1rem;
              margin: 0 auto;
            }
          }

          @media screen and (max-width: 710px) {
            .wrapper {
              flex-wrap: wrap;
              justify-content: center;
            }

            .wrapper-pool {
              flex-wrap: nowrap;
            }

            .section {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              &.first {
                margin-top: 50px;
              }
            }
          }

          @media screen and (max-width: 450px) {
            .section {
              &.first {
                margin-top: 30px;
              }
            }

            .wrapper-pool {
              flex-direction: column;
            }

            .section__btns-pool {
              justify-content: center;
              width: auto;
            }
          }
        `}</style>
      </>
  )
}