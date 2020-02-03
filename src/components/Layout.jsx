import React from 'react';
import styled from '@emotion/styled';
import MenuBar from './MenuBar';
import HoverContainer from './HoverContainer';

export default ({ children }) => {
  return (
    <>
      <MenuBar />
      <HoverContainer>
        <Main>{children}</Main>
      </HoverContainer>
    </>
  );
};

const Main = styled.div`
  background-color: white;
  height: calc(100vh - 8rem);
  width: calc(800px - 2rem);
  overflow-y: auto;
  padding: 1rem;
  transition: 0.2s;
  -webkit-overflow-scrolling: touch;
`;