import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/client';
import {
  ArticleQueryGql,
  ArticleQueryGqlVariables,
} from '../../__generated__/ArticleQueryGql';
import IconHeaderBox from '../../Components/Article/IconHeaderBox';
import TagBadgeList from '../../Components/TagBadge';

export const ARTICLE_QUERY_GQL = gql`
  query ArticleQueryGql($id: Float!) {
    article(id: $id) {
      name
      thumbnail
      homepage
      explanation
      discord
      tags {
        id
        name
      }
    }
  }
`;

interface IProps {
  postId: string;
}

const PostViewPage = ({
  match: {
    params: { postId },
  },
}: RouteComponentProps<IProps>) => {
  const { data } = useQuery<ArticleQueryGql, ArticleQueryGqlVariables>(
    ARTICLE_QUERY_GQL,
    {
      variables: {
        id: +postId,
      },
    },
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>CRAFT101 :: 글 보기</title>
      </Helmet>
      <div className="h-40 container mx-auto grid grid-cols-12 gap-3">
        <div className="col-span-2">&nbsp;</div>
        <div className="col-span-8 shadow-sm rounded-md bg-white">
          <div className="flex items-center gap-2 border-b border-gray-100 p-6">
            <img
              className="col-span-3 bg-blue-300 rounded-full h-24 w-24 overflow-hidden shadow-sm"
              src={`${data?.article.thumbnail}`}
              alt=""
            />
            <div className="flex flex-col ml-3">
              <h1 className="font-sans-kr text-2xl mb-2 subpixel-antialiased text-gray-800">
                {data?.article.name}
              </h1>
              <TagBadgeList tags={data?.article.tags?.map((tag) => tag.name)} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 border-b border-gray-100 py-6">
            <IconHeaderBox icon={'😀'}>
              <p className="font-sans-kr text-sm">999 / 999</p>
            </IconHeaderBox>
            <IconHeaderBox icon={'😀'}>
              <p className="font-sans-kr text-sm">999 / 999</p>
            </IconHeaderBox>
            <IconHeaderBox icon={'😀'}>
              <p className="font-sans-kr text-sm">999 / 999</p>
            </IconHeaderBox>
            <IconHeaderBox icon={'😀'}>
              <p className="font-sans-kr text-sm">999 / 999</p>
            </IconHeaderBox>
          </div>
        </div>
        <div className="col-span-2">&nbsp;</div>
      </div>
    </React.Fragment>
  );
};

export default PostViewPage;
