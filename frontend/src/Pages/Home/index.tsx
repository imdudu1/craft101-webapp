import React from 'react';
import {List} from "../../Components/CardProfile";

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
    <>
      <h1>추천 서버</h1>
      <List profiles={[{
        thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
        name: "동물의 숲",
        explanation: "모여봐요 동물의 숲",
        tags: ["야생", "협동"]
      }, {
        thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
        name: "동물의 숲",
        explanation: "모여봐요 동물의 숲",
        tags: ["야생", "협동"]
      }, {
        thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
        name: "동물의 숲",
        explanation: "모여봐요 동물의 숲",
        tags: ["야생", "협동"]
      }, {
        thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
        name: "동물의 숲",
        explanation: "모여봐요 동물의 숲",
        tags: ["야생", "협동"]
      }, {
        thumbnail: "https://blog.krafton.com/wp-content/uploads/2020/04/GameOn_healing_01.png",
        name: "동물의 숲",
        explanation: "모여봐요 동물의 숲",
        tags: ["야생", "협동"]
      }]}/>
    </>
  </>
)

export default Home
