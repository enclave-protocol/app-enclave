import Button from "./Button"
import Input from "./Input"

export default function Menu() {

  return (
      <>
        <div>
          <div>Slippage tolerance, <b>%</b></div>
          <div>
            <div>
              <Button>0.1</Button>
              <Button>0.5</Button>
              <Button>1</Button>
              <Button>3</Button>
            </div>
            <Input placeholder='Custom' type='number' />
          </div>
        </div>

        <div>
          <div>Delay <b>t</b> block</div>
          <div>
            <div>
              <Button>Off</Button>
              <Button>VRF</Button>
              <Button>10</Button>
              <Button>20</Button>
            </div>
            <Input placeholder='Custom' />
          </div>
        </div>

        <div>
          <div>Available pool</div>
          <div>
            <div>
              <Button>
                <img src='/etoken_pool.svg' alt='enclave'/>
                Enclave
              </Button>
              <Button>
                <img src='/uni.svg' alt='uni'/>
                Uni V2
              </Button>
              <Button>
                <img src='/1inch.svg' alt='1inch'/>
                1inch
              </Button>
              <Button>
                <img src='/balancer.svg' alt='balancer'/>
                Balancer
              </Button>
            </div>
            <Button>All</Button>
          </div>
        </div>
      </>
  )
}