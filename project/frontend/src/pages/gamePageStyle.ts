import styled from "styled-components";
import {Container, ContainerRow} from "../globalStyle/globalStyle";

export const GamePageContainer = styled(Container)`
  background: green;
  height: 100%;
  justify-content: start;
`;

export const MainGameContainer = styled(ContainerRow)`
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

export const UpAndDownPlayersCont = styled(Container)`
   flex: 1;
  height: 100%;
  justify-content: space-between;
`;

export const SideCont = styled(Container)`
  width: 200px;
`;

export const Deck = styled(ContainerRow)`
  
`;