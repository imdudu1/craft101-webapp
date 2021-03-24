import React from "react"
import styled from "styled-components";
import TextButton from "../TextButton";

interface Props {
  tags: string[]
}

const ContainerStyle = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  height: 60px;
  margin: 10px 0;
  padding: 0 16px;
  background: #fff;

  & > * {
    margin-right: 21px;
  }
`

const InlineBarMenu: React.FC<Props> = ({tags}) => (
  <ContainerStyle>
    {tags.map((tag, index) => <TextButton key={`line-${index}`} text={tag} color={"#123"} hoverColor={"#456"}/>)}
  </ContainerStyle>
)

export default InlineBarMenu
