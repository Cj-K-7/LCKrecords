import styled from "styled-components";
import LeaderBoard from "../components/LeaderBoard";

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 30px;
`;
const LCK_LIVE = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 38px;
    margin: 36px;
  }
`;
const LCK_TV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 450px;
  h1 {
    margin: 20px;
    font-size: 32px;
  }
`;

function Home() {
  return (
    <Container>
      <Main>
        <LCK_LIVE>
          <h1>LCK LIVE</h1>
          <iframe
            width="1024"
            height="600"
            src="https://player.twitch.tv/?channel=lck_korea&parent=localhost&autoplay=true"
            allowFullScreen
          ></iframe>
        </LCK_LIVE>
        <LeaderBoard />
      </Main>
      <div>
        <LCK_TV>
          <h1>LCK YOUTUBE</h1>
          <iframe
            title="LCKYOUTUBE"
            width="550"
            height="310"
            src={`https://www.youtube.com/embed?listType=playlist&list=UUw1DsweY9b2AKGjV4kGJP1A&index=1`}
            allowFullScreen
          />
        </LCK_TV>
      </div>
    </Container>
  );
}

export default Home;
