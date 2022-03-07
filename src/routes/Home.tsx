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
  margin-bottom: 100px;
  @media (max-width:1200px) {
    flex-direction: column ;
    align-items: center ;
  }
`;
const Sub = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 30px;
  h1 {
    margin: 20px;
    font-size: 32px;
  }
`;
const LCK_LIVE = styled.div`
  min-width: 1080px;
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
`;
const SNS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div{
    height: 310px;
  display: flex;
  align-items: center;
  }
  svg {
    margin: 20px;
    width: 120px;
    height: 120px;
    fill: ${(props) => props.theme.textColor};
    &:first-child:hover {
      fill: rgb(42, 169, 224);
    }
    &:nth-child(2):hover {
      fill: url("#facebook");
    }
    &:nth-child(3):hover {
      fill: url("#instagram");
    }
    &:nth-child(4):hover {
      fill: rgb(169, 112, 255);
    }
  }
`;

function Home() {
  return (
    <Container>
      <Main>
        <LCK_LIVE>
          <h1>LCK LIVE</h1>
          <iframe
            title="LCKLIVE"
            width="1080"
            height="607.5"
            src="https://player.twitch.tv/?channel=lck_korea&autoplay=true"
            allowFullScreen
          ></iframe>
        </LCK_LIVE>
        <LeaderBoard />
      </Main>
      <Sub>
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
        <SNS>
          <h1>LCK SNS & CONTENTS</h1>
          <div>
            <svg
              onClick={() => (window.location.href = "https://twitter.com/LCK")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg>
            <svg
              onClick={() =>
                (window.location.href = "https://www.facebook.com/officiallck/")
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <defs>
                <linearGradient id="facebook">
                  <stop offset="0%" stopColor="#55AAFF" />
                  <stop offset="50%" stopColor="#446699" />
                  <stop offset="100%" stopColor="#224488" />
                </linearGradient>
              </defs>
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
            </svg>
            <svg
              onClick={() =>
                (window.location.href =
                  "https://www.instagram.com/lckofficial/?hl=ko")
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <defs>
                <linearGradient id="instagram" gradientTransform="rotate(120)">
                  <stop offset="0%" stopColor="rgb(147, 53, 179)" />
                  <stop offset="50%" stopColor="rgb(234, 74, 1)" />
                  <stop offset="100%" stopColor="rgb(235, 204, 3)" />
                </linearGradient>
              </defs>
              <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
            </svg>
            <svg
              onClick={() =>
                (window.location.href = "https://www.twitch.tv/lck_korea")
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z" />
            </svg>
          </div>
        </SNS>
      </Sub>
    </Container>
  );
}

export default Home;
