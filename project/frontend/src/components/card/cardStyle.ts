import styled from "styled-components";

interface Props {
    playerIndex: number;
}

export const CardStyle = styled.img<Props>`
  margin: 5px;
  width: 100px;
  height: auto;
  &:hover {
    border: ${props =>  props.playerIndex === 0 || props.playerIndex > 4 ? '2px solid blue' : null};
    border-radius: ${props =>  props.playerIndex === 0 || props.playerIndex > 4 ? '7px' : null};
    cursor: ${props =>  props.playerIndex === 0 || props.playerIndex > 4 ? 'pointer' : null};
  }
`;

export const CardStyleHoriz = styled.img`
  margin: 2px;
  width: 133px;
  height: auto;
  border-radius: 7px;
`;

