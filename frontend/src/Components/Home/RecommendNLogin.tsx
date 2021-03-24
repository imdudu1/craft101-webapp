import React from "react"
import {List} from "../CardProfile";
import {Col, Row} from "react-bootstrap";
import styled from "styled-components";
import LogoButton from "../LogoButton";
import TextButton from "../TextButton";

const Container = styled.div`
  margin: 10px 0;
`
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #fff;
`
const OptionButtonWrapper = styled.div`
  padding-top: 18px;
  width: 321px;
`
const OptionLeftWrapper = styled.div`
  float: left;

  & > span {
    margin-right: 12px;
  }
`
const OptionRightWrapper = styled.div`
  float: right;
`

const
  RecommendNLogin: React.FC = () => (
    <Container>
      <Row>
        <Col>
          <List profiles={[{
            thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
            name: "동물의 숲",
            explanation: "모여봐요 동물의 숲",
            tags: ["야생", "협동"],
          }, {
            thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
            name: "동물의 숲",
            explanation: "모여봐요 동물의 숲",
            tags: ["야생", "협동"]
          }, {
            thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
            name: "동물의 숲",
            explanation: "모여봐요 동물의 숲",
            tags: ["야생", "협동"]
          }, {
            thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
            name: "동물의 숲",
            explanation: "모여봐요 동물의 숲",
            tags: ["야생", "협동"],
          }]}/>
        </Col>
        <Col xs="5">
          <LoginWrapper>
            <LogoButton
              logo={"https://icon-library.com/images/facebook-icon-32-x-32/facebook-icon-32-x-32-4.jpg"}
              text={"Facebook 로그인"} color={"#fff"} bgColor={"#3b5998"}/>
            <LogoButton
              logo={"https://cdn.iconscout.com/icon/free/png-256/kakaotalk-2-226573.png"}
              text={"Kakaotalk 로그인"} color={"#000"} bgColor={"#ffe812"}/>
            <OptionButtonWrapper>
              <OptionLeftWrapper>
                <TextButton text={"ID 찾기"} color={"#000"} hoverColor={"#344772"}/>
                <TextButton text={"PW 찾기"} color={"#000"} hoverColor={"#344772"}/>
              </OptionLeftWrapper>
              <OptionRightWrapper>
                <TextButton text={"회원가입"} color={"#000"} hoverColor={"#344772"}/>
              </OptionRightWrapper>
            </OptionButtonWrapper>
          </LoginWrapper>
        </Col>
      </Row>
    </Container>
  )

export default RecommendNLogin;
