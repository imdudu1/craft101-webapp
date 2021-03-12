import React from 'react';
import {Badge} from 'react-bootstrap';
import styled from "styled-components";

interface Profile {
  thumbnail: string;
  name: string;
  explanation: string;
  tags: string[];
}

interface ProfileProps {
  profiles: Profile[];
}

const CardListStyle = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0;
`
const ItemWrapper = styled.li`
  width: 153px;
  display: flex;
  flex-direction: column;
  background: #fff;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.2);
  }

  transition: box-shadow 0.1s linear;
`
const ThumbnailImage = styled.img`
  width: 153px;
  height: 192px;
  overflow: hidden;
  display: block;
`
const ServerInfoWrapper = styled.div`
  padding: 8px;
`
const ServerTitle = styled.p`
  font-size: 16px;
`
const ServerExplanation = styled.span`
  font-size: 13px;
  color: #666666;
`
const ServerTags = styled.span`
  padding-right: 3px;
`

export const Item: React.FC<Profile> = ({thumbnail, name, explanation, tags}) => (
  <ItemWrapper>
    <ThumbnailImage src={thumbnail} alt={"thumbnail"}/>
    <ServerInfoWrapper>
      <ServerTitle>{name}</ServerTitle>
      <ServerExplanation>{explanation}</ServerExplanation>
      <div>{tags.map((v, i) => (
        <ServerTags key={`tag-${i}`}><Badge pill variant={"info"}>{v}</Badge></ServerTags>))}</div>
    </ServerInfoWrapper>
  </ItemWrapper>
)

export const List: React.FC<ProfileProps> = ({profiles}) => (
  <CardListStyle>
    {profiles.map((v, i) => (
      <Item thumbnail={v.thumbnail} name={v.name} explanation={v.explanation} tags={v.tags} key={`item-${i}`}/>
    ))}
  </CardListStyle>
)
