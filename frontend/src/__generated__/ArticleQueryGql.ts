/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ArticleQueryGql
// ====================================================

export interface ArticleQueryGql_article_tags {
  __typename: "Tags";
  id: number;
  name: string;
}

export interface ArticleQueryGql_article {
  __typename: "Articles";
  name: string;
  thumbnail: string;
  homepage: string;
  explanation: string;
  discord: string;
  tags: ArticleQueryGql_article_tags[] | null;
}

export interface ArticleQueryGql {
  article: ArticleQueryGql_article;
}

export interface ArticleQueryGqlVariables {
  id: number;
}
