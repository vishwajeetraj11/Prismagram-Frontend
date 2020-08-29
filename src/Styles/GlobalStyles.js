import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export default createGlobalStyle`
    ${reset};    
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,900&display=swap');
    * {
        box-sizing: border-box;
    }
    body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size: 1.4rem;
        font-family: 'Lato';
    }

    a {
        color:${props => props.theme.blueColor};
        text-decoration: none;
    }

    html {
        font-size: 62.5%;
    }

    input:focus {
        outline: none;
    }

`