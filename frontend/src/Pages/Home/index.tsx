import React from 'react';
import LiveStateBar from '../../Components/Home/LiveStateBar';
import LineNewsBar from '../../Components/Home/LineNewsBar';
import SectionTitle from '../../Components/SectionTitle';
import ServerInfiniteList from '../../Components/Home/ServerInfiniteList';

const HomePage: React.FC = () => (
  <div className="container mx-auto grid grid-cols-12 mt-4 gap-3">
    <div className="h-96 col-span-2 flex justify-center border-gray-50 shadow-sm rounded-md bg-gradient-to-tl from-purple-400 via-pink-500 to-red-500">
      <span></span>
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
        <SectionTitle
          title="📺 CRAFT ON-AIR"
          explanation="사용자로부터 등록된 방송이며, 본 사이트와는 관계가 없습니다."
        />
        <SectionTitle
          title="🏜️ 당신의 모험을 시작할 서버를 선택해주세요!"
          explanation="아래 표시된 서버는 랜덤한 순서로 정렬되었으며 노출 순서는 관리자 임의로 설정할 수 없습니다."
        />
        <ServerInfiniteList />
      </div>
      <div className="h-72 col-span-3 border-gray-50 shadow-sm rounded-md bg-gradient-to-tl from-green-400 to-blue-500">
        &nbsp;
      </div>
    </div>
  </div>
);

export default HomePage;
