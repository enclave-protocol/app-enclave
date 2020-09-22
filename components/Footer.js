import {useState} from "react"

export default function Footer() {

  const [meta, useMeta] = useState({
    ip: '192.168.0.0',
    location: 'Location',
    country: 'Country'
  })

  return (
      <footer>
        <div>Alpha v. 0.1.0</div>
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
              color: #fff;
            }

            & div:last-child {
              color: #fff;
            }
          }

          nav {
            color: #fff;
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
        `}</style>
      </footer>
  )
}