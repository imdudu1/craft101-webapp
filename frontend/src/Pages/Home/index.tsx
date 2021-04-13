import React from 'react';
import { Helmet } from 'react-helmet-async';
import LineNewsBar from '../../Components/Home/LineNewsBar';
import LiveStateBar from '../../Components/Home/LiveStateBar';
import ServerInfiniteList from '../../Components/Home/ServerInfiniteList';
import { TwitchCardList } from '../../Components/Home/TwitchCardList';
import SectionTitle from '../../Components/SectionTitle';

const HomePage: React.FC = () => (
  <React.Fragment>
    <Helmet>
      <title>CRAFT101 :: 마인크래프트 서버 리스트</title>
    </Helmet>
    <div className="container mx-auto grid grid-cols-12 gap-3">
      <div className="h-96 col-span-2 flex justify-center border-gray-50 shadow-sm rounded-md bg-gradient-to-tl from-purple-400 via-pink-500 to-red-500">
        <span>&nbsp;</span>
      </div>
      <div className="col-span-10 grid grid-cols-12 gap-3">
        <div className="col-span-9">
          <div className="grid grid-cols-12 gap-3 mb-3">
            <div className="col-span-5">
              <LiveStateBar />
            </div>
            <div className="col-span-7">
              <LineNewsBar />
            </div>
          </div>
          <SectionTitle title="📺 CRAFT ON-AIR" explanation="" />
          <TwitchCardList />
          <SectionTitle
            title="🏜️ 당신의 모험을 시작할 서버를 선택해주세요!"
            explanation=""
          />
          <ServerInfiniteList />
        </div>
        <div className="h-72 col-span-3 border-gray-50 shadow-sm rounded-md bg-gradient-to-tl from-green-400 to-blue-500">
          &nbsp;
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default HomePage;
