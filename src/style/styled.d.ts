import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        backgroundColor : string;
        backgroundColor2 : string;
        textColor : string;
        textHover : string;
        modalColor : string;
        modalTextColor : string
    }
}