import css from 'styled-jsx/css'

export default css.global`
  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/Ubuntu-Bold.ttf');
    src: url('/fonts/Ubuntu-BoldItalic.ttf');
    src: url('/fonts/Ubuntu-Italic.ttf');
    src: url('/fonts/Ubuntu-Light.ttf');
    src: url('/fonts/Ubuntu-LightItalic.ttf');
    src: url('/fonts/Ubuntu-Medium.ttf');
    src: url('/fonts/Ubuntu-MediumItalic.ttf');
    src: url('/fonts/Ubuntu-Regular.ttf');
  }

  html, body {
    margin: 0;
    padding: 0;
    font-weight: 400;
  }
  
  body, button, input, textarea {
    font-family: Ubuntu, sans-serif;
  }
  
  * {
    box-sizing: border-box;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`