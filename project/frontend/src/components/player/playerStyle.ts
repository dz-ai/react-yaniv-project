import styled from "styled-components";

export const PlayerStyle = styled.div<{isYou:boolean}>`
  position: ${props => props.isYou ? 'relative' : null};
`;

export const CacheButtonStyle = styled.button`
  position: absolute;
  top: -35px;
  left: 45%;
`;

