import {useState} from "react"

export default function SelectInput({tokens, id, isReverse, maxBalance}) {

  const [active, setActive] = useState(false)

  const [token, useToken] = useState(id === '1' ? tokens[tokens.length - 1].symbol : '')
  const [logo, useLogo] = useState(id === '1' ? tokens[tokens.length - 1].logoURI : '')

  return (
      <>
        <div>
          <div>
            <form onSubmit={e => e.preventDefault()}>
              <div>

                <input
                    type="text"
                    placeholder={id === '1' ? '0.000' : ''}
                    id={`${id}`}
                />

                <div>
                  {
                    token && <a>{token ? token : 'ETH'}</a>
                  }

                  {
                    logo && <img src={logo} alt="token"/>
                  }

                  <svg id='svg' viewBox="0 0 14 8" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path id='path' d="M1 1L7 7L13 1" stroke="#fff" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {
            active &&

            <div>
              <div>
                <img src='' alt='search'/>
                <input
                    type="text"
                    placeholder='Name / Contract'
                />
              </div>

              <ul></ul>
            </div>
          }

          <div>
            {
              isReverse && <a onClick={maxBalance}>max</a>
            }
          </div>
        </div>
      </>
  )
}
