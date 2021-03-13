import React from "react"
import styled from "styled-components";

interface Props {
  logo: string;
  text: string;
  color: string;
  bgColor: string;
}

type ContainerProps = Pick<Props, 'bgColor'>
type ButtonTextProps = Pick<Props, 'color'>

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 43px;
  width: 321px;
  margin: 5px 0;
  background-color: ${(props: ContainerProps) => props.bgColor || "#fff"};

  :hover {
    cursor: pointer;
  }
`
const ButtonLogoStyle = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 12px;
  border-radius: 3px;
`
const ButtonTextStyle = styled.span`
  color: ${(props: ButtonTextProps) => props.color || "#fff"};
`

const LogoButton: React.FC<Props> = ({logo, text, bgColor, color}) => (
  <ContainerStyle bgColor={bgColor}>
    <>
      <ButtonLogoStyle alt={"button_logo"} src={logo}/>
    </>
    <>
      <ButtonTextStyle color={color}>{text}</ButtonTextStyle>
    </>
  </ContainerStyle>
)

export default LogoButton
