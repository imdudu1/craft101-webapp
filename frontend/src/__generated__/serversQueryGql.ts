/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: serversQueryGql
// ====================================================

export interface serversQueryGql_articles_tags {
  __typename: "Tags";
  name: string;
}

export interface serversQueryGql_articles {
  __typename: "Articles";
  id: number;
  thumbnail: string;
  name: string;
  explanation: string;
  discord: string;
  homepage: string;
  tags: serversQueryGql_articles_tags[] | null;
}

export interface serversQueryGql {
  articles: serversQueryGql_articles[];
}

export interface serversQueryGqlVariables {
  offset: number;
  limit: number;
}
