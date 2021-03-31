import React from 'react';
import useSWR from 'swr';
import axios from 'axios';

interface IChannel {
  status: string;
  url: string;
  display_name: string;
  name: string;
  language: string;
  logo: string;
}

interface IPreview {
  large: string;
  medium: string;
  small: string;
  template: string;
}

interface IStream {
  channel: IChannel;
  preview: IPreview;
}

interface IStreams {
  streams: IStream[];
}

interface Props {
  status: string;
  displayName: string;
  name: string;
  url: string;
  logo: string;
  thumbnail: string;
}

export const TwitchCard: React.FC<Props> = ({
  status,
  thumbnail,
  displayName,
  name,
  url,
  logo,
}) => (
  <a href={url} className="hover:no-underline">
    <div className="mr-2 my-2 h-48 w-40 min-w-17rem shadow-sm rounded-md bg-white cursor-pointer transition duration-300 transform hover:-translate-y-1 hover:shadow-xl">
      <img
        src={thumbnail}
        className="h-32 w-full bg-red-300 rounded-t-md"
        alt="thumbnail"
      />
      <div className="h-16 px-2 py-2 flex flex-row items-center">
        <img src={logo} alt="profile_logo" className="w-10 mr-2 rounded-full" />
        <div>
          <p className="font-sans-kr text-sm line-clamp-1 overflow-hidden overflow-ellipsis whitespace-normal">
            {status}
          </p>
          <p className="font-sans-kr text-gray-500 font-light text-xs line-clamp-1 overflow-hidden overflow-ellipsis whitespace-normal">
            {displayName} ({name})
          </p>
        </div>
      </div>
    </div>
  </a>
);

export const TwitchCardList: React.FC = () => {
  const { data } = useSWR<IStreams>(
    [
      'https://api.twitch.tv/kraken/search/streams?query=Minecraft',
      'm672k7f5wjo1sbk5y1ioi23h0gb2yj',
    ],
    (url, clientId) =>
      axios
        .get(url, {
          headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            'Client-ID': clientId,
          },
        })
        .then((r) => r.data),
  );

  return (
    <div className="pb-3 flex flex-row overflow-x-scroll whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 ">
      {data?.streams.map(
        (
          {
            channel: { status, display_name, name, url, logo },
            preview: { medium },
          },
          key,
        ) => (
          <TwitchCard
            status={status}
            thumbnail={medium}
            displayName={display_name}
            name={name}
            url={url}
            logo={logo}
            key={`twitchtv-${key}`}
          />
        ),
      )}
    </div>
  );
};
