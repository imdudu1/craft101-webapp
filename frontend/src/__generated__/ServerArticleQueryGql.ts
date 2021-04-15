/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ServerArticleQueryGql
// ====================================================

export interface ServerArticleQueryGql_serverArticle_article_tags {
  __typename: "Tags";
  id: number;
  name: string;
}

export interface ServerArticleQueryGql_serverArticle_article {
  __typename: "Articles";
  name: string;
  host: string;
  thumbnail: string;
  homepage: string;
  explanation: string;
  discord: string;
  tags: ServerArticleQueryGql_serverArticle_article_tags[] | null;
}

export interface ServerArticleQueryGql_serverArticle_status {
  __typename: "MCStatus";
  host: string;
  port: number;
  protocolVersion: number;
  maxPlayers: number;
  onlinePlayers: number;
  description: string;
  version: string;
}

export interface ServerArticleQueryGql_serverArticle {
  __typename: "ServerArticleDetailOutputDto";
  article: ServerArticleQueryGql_serverArticle_article | null;
  status: ServerArticleQueryGql_serverArticle_status | null;
}

export interface ServerArticleQueryGql {
  serverArticle: ServerArticleQueryGql_serverArticle;
}

export interface ServerArticleQueryGqlVariables {
  id: number;
}
