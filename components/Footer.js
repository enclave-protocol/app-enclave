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
      </footer>
  )
}