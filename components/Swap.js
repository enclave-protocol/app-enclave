import Box from "./Box"
import Button from "./Button"
import SelectInput from "./SelectInput"
import {useState} from "react"

export default function Swap({tokens}) {

  const [loading, useLoading] = useState(false)
  const [reverse, useReverse] = useState(false)

  const [menu, useMenu] = useState(false)

  const [addressesCount, useAddressesCount] = useState([1, 2, 3])

  const addAddress = () => {
    if (addressesCount.length > 6) return
    useAddressesCount(prev => [...prev, prev.length + 1])
  }

  const menuHandler = () => {
    useMenu(prev => !prev)
  }

  const maxBalance = async () => {
  }

  return (
      <>
        <Box title='Swap' menu={true} menuHandler={menuHandler}>
          <div>
            <div>
              <label>From</label>
              <label>To</label>
            </div>
            <div>
              <div>
                <SelectInput
                    tokens={tokens}
                    placeholder='0.000'
                    id='1'
                    isReverse={!reverse}
                    maxBalance={maxBalance}
                />
              </div>
              {
                !loading && <img src="" alt=""/>
              }

              <div>
                <SelectInput
                    tokens={tokens}
                    placeholder='Name / Contract'
                    id='2'
                    isReverse={reverse}
                    maxBalance={maxBalance}
                />
              </div>
            </div>
          </div>
          {
            menu && <div>Menu</div>
          }
        </Box>

        <Box title='Private Addresses' alert={true}>
          <div>
            <div>
              {
                addressesCount.map((_, index) => {
                  return <input key={index} type="text" placeholder='0x0000'/>
                })
              }
            </div>
            <div>
              <div>
                <span><img src="" alt=""/></span>
                <span>&nbsp;0.000</span>
              </div>
              <div onClick={addAddress}>+&nbsp;<span>More</span></div>
            </div>
            <Button>Swap</Button>
          </div>
        </Box>
      </>
  )
}