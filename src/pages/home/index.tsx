import styled from "@emotion/styled";
import { Summary } from "./components/Summary";
import { DataInput } from "./components/DataInput";
import { DataGroup } from "./components/DataGroup";
import { apiClient } from "@/shared/services";

const Home = () => {
  const handleRequest = async () => {
    try {
      await apiClient.request("budgetsf");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Main onClick={handleRequest}>
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
