import styled from "styled-components";
import LeaderBoard from "../components/LeaderBoard";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LCK_TV = styled.div`
  padding: 20px;
  width: 800px;
  height: 450px;
`;

function Home() {
  return (
    <Container>
      <LeaderBoard/>
      <LCK_TV>
        <iframe
         title="LCKYOUTUBE"
          width="800"
          height="450"
          src="https://www.youtube.com/embed?listType=playlist&list=UUw1DsweY9b2AKGjV4kGJP1A&index=1&autoplay=1"
          allowFullScreen
        ></iframe>
      </LCK_TV>
    </Container>
  );
}

export default Home;
