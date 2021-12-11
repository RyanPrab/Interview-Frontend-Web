import styled from "styled-components";
import LogoImage from "./Logo";
import { Question1, Question2 } from "./Icons";

const NavbarWrapper = styled.div.attrs(() => ({
  className: `relative bg-white w-full h-screen rounded-lg shadow-md`
}))``;

const NavbarContainer = styled.div.attrs(() => ({
  className: 'container mx-auto flex flex-col justify-start items-center'
}))``;

const LogoWrapper = styled.a.attrs(() => ({
  className: `flex flex-row w-full justify-center h-20 items-center text-white cursor-pointer relative pt-10 pb-20`,
  href: '/'
}))``;

const NavLink = styled.a.attrs(() => ({
  className: `flex flex-row justify-center w-full cursor-pointer hover:bg-gray-50 hover:font-semibold text-gray-500 text-sm space-x-2 py-2`
}))`
  &:hover {
    border-right: 6px solid blue;
    height: 40px;
  }
`;

export default function Navbar(props) {
  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoWrapper>
          <LogoImage/>
        </LogoWrapper>
        <NavLink href="/">
          <div>
            <Question1/>
          </div>
          <div>
            Question 1
          </div>
        </NavLink>
        <NavLink href="/question2">
          <div>
            <Question2/>
          </div>
          <div>
            Question 2
          </div>
        </NavLink>
      </NavbarContainer>
    </NavbarWrapper>
  );
};
