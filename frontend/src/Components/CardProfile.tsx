import React from 'react';
import {Badge} from 'react-bootstrap';
import styled from "styled-components";

interface IProfileProps {
  thumbnail: string;
  name: string;
  explanation: string;
  tags: string[];
  cardSize: string;
}

interface IProfiles {
  profiles: Partial<IProfileProps>[];
}

type TItemWrapperProps = Pick<IProfileProps, "cardSize">

const ListStyle = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
const ItemWrapperStyle = styled.li`
  width: ${(props: TItemWrapperProps) => `${props.cardSize}`};
  display: block;
  float: left;
  background: #fff;
  padding: 3px;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: 12px;
  }

  &:hover {
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.2);
  }

  transition: box-shadow 0.1s linear;
`
const ThumbnailStyle = styled.img`
  width: 100%;
  height: 192px;
  overflow: hidden;
  display: block;
`
const InfoWrapperStyle = styled.div`
  padding: 8px;
`
const ServerTitleStyle = styled.p`
  font-size: 16px;
`
const ExplanationStyle = styled.span`
  font-size: 13px;
  color: #666666;
`
const TagsStyle = styled.span`
  padding-right: 3px;
`

const Item = (profile: IProfileProps) => (
  <ItemWrapperStyle cardSize={profile.cardSize}>
    {console.log(profile)}
    <ThumbnailStyle src={profile.thumbnail} alt={"thumbnail"}/>
    <InfoWrapperStyle>
      <ServerTitleStyle>{profile.name}</ServerTitleStyle>
      <ExplanationStyle>{profile.explanation}</ExplanationStyle>
      <div>{profile.tags.map((v, i) => (
        <TagsStyle key={`tag-${i}`}><Badge pill variant={"info"}>{v}</Badge></TagsStyle>))}</div>
    </InfoWrapperStyle>
  </ItemWrapperStyle>
)
Item.defaultProps = {
  thumbnail: "",
  name: "",
  explanation: "",
  tags: [],
  cardSize: "149px"
}

export const List = ({profiles}: IProfiles) => (
  <ListStyle>
    {profiles.map((v, i) => (
      <Item {...v} key={`item-${i}`}/>
    ))}
  </ListStyle>
)
