import {useState, useContext, useEffect} from "react"
import ThemeContext from "../theme/provider"
import {getIpAndLocation} from "../api/api"

export default function Footer() {

  const {theme} = useContext(ThemeContext)

  const [meta, useMeta] = useState({
    ip: '192.168.0.0',
    location: 'Location',
    country: 'Country'
  })

  useEffect(() => {
    async function getIp() {
      const {ip, city, country_code} = await getIpAndLocation()

      useMeta(prev => ({
        ...prev,
        ip,
        location: city,
        country: country_code
      }))
    }

    getIp()
  }, [])

  return (
      <footer>
        <div>Alpha v. 0.4.7</div>
          <nav>
            <a target='_blank' rel="nofollow noopener">Docs</a>
            <a target='_blank' rel="nofollow noopener">Api</a>
            <a target='_blank' rel="nofollow noopener">Github</a>
          </nav>
          <div>
            {
              meta.ip &&
              <>
                <span>Your IP</span>
                <span>&nbsp;{meta.ip},</span>
                <span>&nbsp;{`${meta.location}, ${meta.country}`}</span>
              </>
            }
        </div>

        <style jsx>{`
          footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 0 0 auto;
            font-size: 14px;

            position: relative;

            & div:first-child {
              color: ${theme.footer.version};
            }

            & div:last-child {
              color: ${theme.footer.location};
            }
          }

          nav {
            color: ${theme.footer.links};
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            font-size: 20px;
          }

          a {
            cursor: pointer;
            transition: color .2s linear;
            
            &:first-child, &:nth-child(2) {
              color: darkgray;
              cursor: not-allowed;
              
              &:hover {
                color: darkgray;
              }
            }

            & + & {
              margin-left: 1rem;
            }

            &:hover {
              color: #F48432;
            }
          }
          
          @media screen and (min-width: 2000px) {
            footer {
              font-size: .7vw;
            }
            
            nav {
              font-size: 1vw;
            }
          }

          @media screen and (min-width: 3000px) and (max-height: 1500px) {
            footer {
              font-size: .5vw;
            }

            nav {
              font-size: .7vw;
            }
          }
          
          @media screen and (max-width: 880px) {
            nav {
              position: static;
              transform: none;
            }
          }
          
          @media screen and (max-width: 720px) {
            footer {
              flex-direction: column;
            }
            
            nav {
              margin: .7rem 0;
            }
          }
          
          @media screen and (max-width: 370px) {
            footer div:last-child {
              font-size: 14px;
            }
          }
          
          @media screen and (max-width: 340px) {
            footer div:last-child {
              font-size: 12px;
            }
          }
        `}</style>
      </footer>
  )
}