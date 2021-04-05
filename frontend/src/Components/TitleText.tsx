import React from 'react';
import styled from 'styled-components';

interface TitleTextProps {
  text: string;
}

const Title = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-top: 29px;
`;

const TitleText = ({ text }: TitleTextProps) => <Title>{text}</Title>;

export default TitleText;
