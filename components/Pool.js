import Box from "./Box"
import Button from "./Button"

export default function Pool() {

  return (
      <>
        <Box title='Your liquidity'>
          <div>
            <div>
              <Button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                      stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path
                      d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                      stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Create Pair
              </Button>
              <Button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
                      stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 17L15 12L10 7" stroke="#000" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                  <path d="M15 12H3" stroke="#000" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
                Add Liquidity
              </Button>
              <Button>Claim</Button>
              <Button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                      stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="#000" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="#000" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
                Remove Liquidity
              </Button>
            </div>

            <div>
              <div>
                <span>Your liquidity</span>
              </div>

              <div>
                <span>ENZK/USDT</span>
                <span>Manage</span>
              </div>
            </div>

            <div>
              <span>Rewards: </span>
              0.000
            </div>
          </div>
        </Box>
      </>
  )
}