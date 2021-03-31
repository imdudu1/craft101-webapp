import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  serversQueryGql,
  serversQueryGql_articles,
  serversQueryGql_articles_tags,
  serversQueryGqlVariables,
} from '../../__generated__/serversQueryGql';

interface Props {
  thumbnail: string;
  name: string;
  explanation: string;
  discord: string;
  homepage: string;
  tags: serversQueryGql_articles_tags[] | null;
}

export const ServerButton: React.FC<Props> = ({
  thumbnail,
  name,
  explanation,
  discord,
  homepage,
  tags,
}) => (
  <div className="grid grid-cols-12 p-4 shadow-sm rounded-xl bg-white cursor-pointer transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
    <img
      className="col-span-3 bg-blue-300 rounded-full h-24 w-24 overflow-hidden shadow-sm"
      src={thumbnail}
      alt="thumbnail"
    />
    <div className="max-h-full col-span-9 mr-3 flex flex-col justify-between">
      <div className="flex flex-col">
        <p className="font-sans-kr text-xl mb-1 overflow-hidden overflow-ellipsis line-clamp-1 text-gray-700">
          {name}
        </p>
        <p className="font-sans-kr text-xs text-gray-400 overflow-ellipsis overflow-hidden line-clamp-2">
          {explanation}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <a className="hover:no-underline" href={discord}>
            <img
              className="w-5 h-5 mr-2"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlLz48cGF0aCBkPSJNMjAuMjIyIDBjMS40MDYgMCAyLjU0IDEuMTM3IDIuNjA3IDIuNDc1VjI0bC0yLjY3Ny0yLjI3My0xLjQ3LTEuMzM4LTEuNjA0LTEuMzk4LjY3IDIuMjA1SDMuNzFjLTEuNDAyIDAtMi41NC0xLjA2NS0yLjU0LTIuNDc2VjIuNDhDMS4xNyAxLjE0MiAyLjMxLjAwMyAzLjcxNS4wMDNoMTYuNUwyMC4yMjIgMHptLTYuMTE4IDUuNjgzaC0uMDNsLS4yMDIuMmMyLjA3My42IDMuMDc2IDEuNTM3IDMuMDc2IDEuNTM3LTEuMzM2LS42NjgtMi41NC0xLjAwMi0zLjc0NC0xLjEzNy0uODctLjEzNS0xLjc0LS4wNjQtMi40NzUgMGgtLjJjLS40NyAwLTEuNDcuMi0yLjgxLjczNS0uNDY3LjIwMy0uNzM1LjMzNi0uNzM1LjMzNnMxLjAwMi0xLjAwMiAzLjIxLTEuNTM3bC0uMTM1LS4xMzVzLTEuNjcyLS4wNjQtMy40NzcgMS4yN2MwIDAtMS44MDUgMy4xNDQtMS44MDUgNy4wMiAwIDAgMSAxLjc0IDMuNzQzIDEuODA2IDAgMCAuNC0uNTMzLjgwNS0xLjAwMi0xLjU0LS40NjgtMi4xNC0xLjQwNC0yLjE0LTEuNDA0cy4xMzQuMDY2LjMzNS4yaC4wNmMuMDMgMCAuMDQ0LjAxNS4wNi4wM3YuMDA2Yy4wMTYuMDE2LjAzLjAzLjA2LjAzLjMzLjEzNi42Ni4yNy45My40LjQ2Ni4yMDIgMS4wNjUuNDAzIDEuOC41MzYuOTMuMTM1IDEuOTk2LjIgMy4yMSAwIC42LS4xMzUgMS4yLS4yNjcgMS44LS41MzUuMzktLjIuODctLjQgMS4zOTctLjczNyAwIDAtLjYuOTM2LTIuMjA1IDEuNDA0LjMzLjQ2Ni43OTUgMSAuNzk1IDEgMi43NDQtLjA2IDMuODEtMS44IDMuODctMS43MjYgMC0zLjg3LTEuODE1LTcuMDItMS44MTUtNy4wMi0xLjYzNS0xLjIxNC0zLjE2NS0xLjI2LTMuNDM1LTEuMjZsLjA1Ni0uMDJ6bS4xNjggNC40MTNjLjcwMyAwIDEuMjcuNiAxLjI3IDEuMzM1IDAgLjc0LS41NyAxLjM0LTEuMjcgMS4zNC0uNyAwLTEuMjctLjYtMS4yNy0xLjMzNC4wMDItLjc0LjU3My0xLjMzOCAxLjI3LTEuMzM4em0tNC41NDMgMGMuNyAwIDEuMjY2LjYgMS4yNjYgMS4zMzUgMCAuNzQtLjU3IDEuMzQtMS4yNyAxLjM0LS43IDAtMS4yNy0uNi0xLjI3LTEuMzM0IDAtLjc0LjU3LTEuMzM4IDEuMjctMS4zMzh6Ii8+PC9zdmc+"
              alt="discord"
            />
          </a>
          <a className="hover:no-underline" href={homepage}>
            <img
              className="w-5 h-5"
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGcgaWQ9ImluZm8iLz48ZyBpZD0iaWNvbnMiPjxwYXRoIGQ9Ik0yMy42LDEwLjNMMTMuMiwyLjRjLTAuNy0wLjUtMS43LTAuNS0yLjUsMEwwLjQsMTAuM0MtMC40LDEwLjksMCwxMiwxLDEyaDF2Ni4xQzIsMjAuMiwzLjgsMjIsNiwyMmgyICAgYzAuNiwwLDEtMC40LDEtMXYtNC45QzksMTUsOS45LDE0LDExLDE0aDJjMS4xLDAsMiwxLDIsMi4xVjIxYzAsMC41LDAuNCwxLDEsMWgyYzIuMiwwLDQtMS44LDQtMy45VjEyaDEgICBDMjMuOSwxMiwyNC4zLDEwLjksMjMuNiwxMC4zeiIgaWQ9ImhvbWUiLz48L2c+PC9zdmc+"
              alt="homepage"
            />
          </a>
        </div>
        <ul className="flex flex-row">
          {tags?.slice(undefined, 3).map((tag, key) => (
            <li className="mr-1" key={`tags-${key}`}>
              <div className="pt-1 pb-1 flex items-center space-x-1 text-sm px-2 bg-gray-200 text-gray-800 rounded-full">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full">
                  &nbsp;
                </div>
                <p className="w-10 text-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {tag.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

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
          ({ thumbnail, name, explanation, discord, homepage, tags }, key) => (
            <ServerButton
              thumbnail={thumbnail}
              name={name}
              explanation={explanation}
              discord={discord}
              homepage={homepage}
              tags={tags}
              key={`mcsb-${key}`}
            />
          ),
        )}
      </div>
      <div className="mt-8 flex justify-center items-center">
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            >
              &nbsp;
            </circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            >
              &nbsp;
            </path>
          </svg>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ServerInfiniteList;
