import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
	-ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
body {
	-ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
	font-size: 1.2em;
	font-weight: 900;
	line-height: 1;
	color : ${(props) => props.theme.textColor};
	background-image: linear-gradient(to top left, rgb(31, 26, 46),rgb(45, 40, 58) );
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Safari */
	-khtml-user-select: none; /* Konqueror HTML */
	-moz-user-select: none; /* Old versions of Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
	font-family: 'Orbitron', sans-serif;
	overflow-x: hidden;
	&::-webkit-scrollbar{
		display: none;
	}
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a {
	&:link{
		color:inherit;
		text-decoration: none;
	}
	&:visited{
		color: inherit;
	}
}
input, button{ 
	padding : 10px 12px;
	font-size : 16px;
	border: none;
	border-radius: 8px;
	transition: 1.2s;
	&:focus{
	outline : none;
	box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.3) inset;
	}
}
`;

export default GlobalStyle;
