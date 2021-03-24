import React from 'react';
import RecommendNLogin from "../../Components/Home/RecommendNLogin";
import InlineBarMenu from "../../Components/Home/InlineBarMenu";
import ServerList from "../../Components/Home/ServerList";
import TitleText from "../../Components/TitleText";

const Home: React.FC = () => (
  <>
    <>{/* 추천 서버 타이틀 */}</>
    <>
      <>
        {/* 추천 서버 카드 프로필 */}
      </>
      <>
        {/* 인기 서버 태그 순위 */}
      </>
    </>
    <TitleText text={"추천 서버"}/>
    <RecommendNLogin/>
    <TitleText text={"서버 목록"}/>
    <InlineBarMenu tags={["#추천이_높은_서버", "#고정_멤버가_많은_서버", "#10대가_많은_서버", "#20대가_많은_서버", "#야생", "#건축", "#마을", "#모드"]}/>
    <ServerList/>
  </>
)

export default Home;
