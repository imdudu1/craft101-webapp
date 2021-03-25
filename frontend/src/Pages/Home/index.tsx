import React from 'react';
import LiveStateBar from '../../Components/Home/LiveStateBar';
import LineNewsBar from '../../Components/Home/LineNewsBar';
import SectionTitle from '../../Components/SectionTitle';
import ServerButton from '../../Components/ServerButton';

const HomePage: React.FC = () => (
  <div className="container mx-auto grid grid-cols-12 mt-4 gap-3">
    <div className="col-span-2 border-gray-50 shadow-sm rounded-md bg-white flex justify-center">
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
        <div className="mb-3 grid grid-cols-2 gap-3">
          <ServerButton
            title={'코스모에이지'}
            explanation={
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
            }
            discord={'123'}
            homepage={'123'}
          />
          <ServerButton
            title={'링팜서버'}
            explanation={
              '다양한 사람들이 찾는 링팜서버에서 재미있는 마인팜을 즐겨보세요. 2019년 10월1일~ing'
            }
            discord={'123'}
            homepage={'123'}
          />
          <ServerButton
            title={'코스모에이지'}
            explanation={'[ 1.12.2 ] 【코스모 : 마크에이지서버】'}
            discord={'123'}
            homepage={'123'}
          />
        </div>
      </div>
      <div className="h-72 col-span-3 border-gray-50 shadow-sm rounded-md bg-gradient-to-tl from-green-400 to-blue-500">
        &nbsp;
      </div>
    </div>
  </div>
);

export default HomePage;
