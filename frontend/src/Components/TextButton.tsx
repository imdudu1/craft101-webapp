import React from 'react';
import styled from 'styled-components';

interface TextButtonProps {
  text: string;
  color: string;
  hoverColor: string;
}

type StyleProps = Pick<TextButtonProps, 'color' | 'hoverColor'>;

const TextStyle = styled.span`
  font-size: 14px;
  color: ${(props: StyleProps) => props.color || '#fff'};

  :hover {
    color: ${(props: StyleProps) => props.hoverColor || '#fff'};
    cursor: pointer;
  }
`;

const TextButton: React.FC<TextButtonProps> = ({ text, color, hoverColor }) => (
  <TextStyle color={color} hoverColor={hoverColor}>
    {text}
  </TextStyle>
);

export default TextButton;
