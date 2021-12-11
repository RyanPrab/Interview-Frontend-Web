import styled from "styled-components";

const Section = styled.div.attrs(() => ({
  className: `bg-gray-100 flex justify-center w-full py-4`
}))``;

const Copyright = styled.div.attrs(() => ({
  className: `text-gray-500 text-sm`
}))``;

export default function Footer(props) {
  return (
    <Section>
      <Copyright>
        Copyright &copy; 2019&nbsp;
        <a href="https://www.moduit.id/id/" target="_blank" className="text-blue-500">
          PT Moduit Digital Indonesia
        </a>
        &nbsp;. All rights reserved
      </Copyright>
    </Section>
  )
}
