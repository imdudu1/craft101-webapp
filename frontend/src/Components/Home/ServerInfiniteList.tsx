import React from 'react';
import ServerButton from './ServerButton';
import { gql, useQuery } from '@apollo/client';
import {
  serversQueryGql,
  serversQueryGql_articles,
  serversQueryGqlVariables,
} from '../../__generated__/serversQueryGql';

export const SERVERS_QUERY_GQL = gql`
  query serversQueryGql($offset: Float!, $limit: Float!) {
    articles(offset: $offset, limit: $limit) {
      thumbnail
      name
      explanation
      discord
      homepage
      tags {
        name
      }
    }
  }
`;

const ServerInfiniteList: React.FC = () => {
  const [servers, setServers] = React.useState<serversQueryGql_articles[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { fetchMore } = useQuery<serversQueryGql, serversQueryGqlVariables>(
    SERVERS_QUERY_GQL,
    {
      variables: {
        offset: 0,
        limit: 10,
      },
      fetchPolicy: 'cache-and-network',
      onCompleted: ({ articles }) => {
        setServers(articles);
      },
    },
  );

  const onLoadMore = React.useCallback(async () => {
    setLoading(true);
    await fetchMore({
      variables: {
        offset: servers.length,
        limit: 10,
      },
    });
    setLoading(false);
  }, [fetchMore, servers.length]);

  const scrollEventHandler = React.useCallback(async () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      await onLoadMore();
    }
  }, [loading, onLoadMore]);

  React.useEffect(() => {
    window.addEventListener('scroll', scrollEventHandler);
    return () => {
      window.removeEventListener('scroll', scrollEventHandler);
    };
  }, [scrollEventHandler]);

  return (
    <div>
      <div className="mb-3 grid grid-cols-2 gap-3">
        {servers.map(
          ({ thumbnail, name, explanation, discord, homepage, tags }, k) => (
            <ServerButton
              thumbnail={thumbnail}
              name={name}
              explanation={explanation}
              discord={discord}
              homepage={homepage}
              tags={tags}
            />
          ),
        )}
      </div>
      <div className="mt-8 flex justify-center items-center">
        {loading ? <span>Loading...</span> : <></>}
      </div>
    </div>
  );
};

export default ServerInfiniteList;
