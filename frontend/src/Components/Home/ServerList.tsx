import React from "react"
import styled from "styled-components";
import {List} from "../CardProfile";

const ContainerStyle = styled.div`
  & > ul > li {
    margin: 6px 0;
  }
`

const ServerList: React.FC = () => {
  let v = []
  for (let i = 0; i < 12; i++) {
    v.push({
      thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
      name: "동물의 숲",
      explanation: "모여봐요 동물의 숲",
      tags: ["야생", "협동"],
      cardSize: "265px"
    })
  }

  return <ContainerStyle>
    <List profiles={v}/>
  </ContainerStyle>
}

export default ServerList
