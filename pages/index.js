import Layout from "../components/Layout"
import Swap from "../components/Swap"
import Pool from "../components/Pool"
import {useState} from "react"
import {motion} from "framer-motion"

export default function Home() {

  const [nav, useNav] = useState('swap')

  const navHandler = e => {
    const target = e.target.textContent

    target.toLowerCase()
    useNav(target)
  }

  return (
      <Layout navHandler={navHandler} btnStyles={nav === 'swap'}>
        {
          nav === 'swap' && (
              <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: .7}}
                  >
                <Swap />
              </motion.div>
          )
        }
        {
          nav === 'pool' && (
              <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: .7}}
                  >
                <Pool />
              </motion.div>
          )
        }
      </Layout>
  )
}