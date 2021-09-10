import InputMask, { Props as MaskProps } from "react-input-mask";

declare module "react-input-mask" {
    export interface Props extends MaskProps {
        maskChar?: string | null;
    }

    export default InputMask as Props;
}
