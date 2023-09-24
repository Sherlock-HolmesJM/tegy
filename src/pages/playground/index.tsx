import { apiClient } from "@/shared/services";
import styled from "@emotion/styled";
import { useEffect } from "react";

export default function Playground() {
  const request = async () => {
    try {
      const res = await apiClient.request("budgets");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <Main>
      <section>Playground.</section>
    </Main>
  );
}

const Main = styled.main``;
