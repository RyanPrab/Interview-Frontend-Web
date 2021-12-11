import React, { useRef } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const FixedContainer = styled.div.attrs(() => ({
  className: `fixed left-0 inset-x-0 w-1/5`
}))`
`;

const PageContainer = styled.div.attrs(() => ({
  className: `bg-gray-100 h-screen px-4`
}))``;

export default function Layout(props) {
  const NavbarRef = useRef(null);
  const NavbarWidth = 300;
  return (
    <>
      <FixedContainer ref={NavbarRef}>
        <Navbar/>
      </FixedContainer>
      <PageContainer style={{ paddingLeft: `${NavbarWidth}px`}}>
        {props.children}
      </PageContainer>
    </>
  );
};
