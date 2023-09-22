import styled from "@emotion/styled";
import { Summary } from "./components/Summary";
import { DataInput } from "./components/DataInput";
import { DataGroup } from "./components/DataGroup";

const Home = () => {
  return (
    <Main>
      <Summary />
      <DataInput />
      <DataGroup />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - var(--header-height));
`;

export default Home;
