const dark = {
  name: 'dark',
  scroll: {
    color: '#101215',
    back: '#282C31'
  },
  bg: {
    body: 'linear-gradient(118.2deg, #282C31 3.01%, #101215 97.04%)',
  },
  header: {
    gasColor: 'rgba(255, 255, 255, .75)',
    gasShadow: 'none',
    btnColor: '#FFFFFF',
    btnShadow: '0px 0px 3.5px 0px rgba(0, 22, 0, 1)',
    ethColor: 'rgba(255, 255, 255, 0.54)',
    ethTextShadow: 'none',
    connectImg: 'rgba(255, 255, 255, 0.77)',
    connectImgAct: 'rgba(126, 247, 70, 0.77)',
    connectBtnColor: '#FFFFFF',
    connectBtnShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
  },
  dropdown: {
    fontColor: '#E6DBDB',
    fontHover: '#FFFFFF',
    dropdownColor: 'linear-gradient(89.95deg, #24292D 0.04%, #20252A 99.95%)',
    dropdownShadow: '0px 10px 10px rgba(0, 0, 0, 0.42)',
    hoverColor: 'linear-gradient(277.02deg, #F48432 23.17%, #FE9F5A 98.34%)',
    hoverShadow: '-4px -4px 23px 6px rgba(235, 199, 146, 0.2), inset -4px -4px 18px rgba(255, 255, 255, 0.12)'
  },
  pool: {
    fontColor: '#FFFFFF',
    box: '#202529',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.25)',
    liquidity: '#FFFFFF',
    liquidityShadow: 'none',
    tokens: '#FCFCFC',
    manage: 'rgba(255, 255, 255, 0.64)',
    reward: '#C7C8C9',
    rewardShadow: 'none',
    btnColor: 'rgba(255, 255, 255, 0.74)',
    btnTextShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
  },
  swap: {
    labelColor: 'rgba(255, 255, 255, 0.74)',
    labelTextShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    maxColor: 'rgba(255, 255, 255, 0.78)',
    inputTextColor: 'rgba(255, 255, 255, 0.88)',
    placeholderColor: ' rgba(255, 255, 255, 0.38)',
    choiceColor: '#FFFFFF',
    btnColor: '#FFFDFD',
    btnTextShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    addresses: {
      ethColor: 'rgba(255, 255, 255, 0.54)',
      ethTextShadow: '0px 0px 3.5px #001600',
      moreColor: 'rgba(255, 255, 255, 0.8)',
      moreTextColor: '0px 4px 4px 0px rgba(0,0,0,0,25)',
      placeholder: 'rgba(255, 255, 255, 0.1)'
    }
  },
  card: {
    bg: 'linear-gradient(89.95deg, #2B2F34 0.04%, #202529 99.95%)',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.42)',
    title: 'rgba(222, 224, 225, 0.88)',
    labels: 'rgba(255, 255, 255, 0.74)'
  },
  button: {
    bg: 'linear-gradient(89.95deg, #2B2F34 0.04%, #202529 99.95%)',
    bgShadow: '-4px -4px 13px rgba(255, 244, 244, 0.04), 4px 4px 10px rgba(0, 0, 0, 0.42)',
    bgActive: 'linear-gradient(97.72deg, #FE9F5A 37.92%, #F48432 67.9%)',
    bgActiveShadow: '-4px -4px 13px rgba(254, 159, 90, 0.22), 4px 4px 10px rgba(0, 0, 0, 0.42)'
  },
  footer: {
    version: 'rgba(255, 255, 255, 0.4)',
    links: '#FFFFFF',
    location: 'rgba(255, 255, 255, 0.47)'
  },
  font: {
    primary: '#fff',
    secondary: 'rgba(222, 224, 225, 0.88)',
    hover: '#F48432',
    hoverActive: 'gray'
  },
  icon: {
    menu: '#fff',
    select: '#fff',
    pool: '#fff'
  }
}

const light = {
  name: 'light'
}

export const Theme = {dark, light}
