import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table, input{
        margin: 0;
        padding: 0;
        border: 0;
        font-family: 'NotoSansKR';
    }
    html{
        width:100%;
        overflow: hidden;

    }
    body{
        width:100%;
        line-height: 1;
        background-color: #ffffff;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    ol, ul{
        line-height: 1;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
    tbody {
            max-height: 600px;
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera*/
            }
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
    }
    #root {
        width:100%;
    }
 
    img{
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
    }

    .react-modal{
        position: absolute;
        inset: 0;
        background-color: tomato;
        padding:20px;
        display:flex;
        flex-direction: column;

        
    }

    .react-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
  }
`;

export default GlobalStyles;
