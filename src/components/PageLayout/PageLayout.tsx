import React from "react"
import { Container, ResponsiveValue } from "@chakra-ui/react"

interface PageLayoutProps {
  maxWidth?: string,
  height?: ResponsiveValue<number | (string & {})>
}

const PageLayout: React.FC<PageLayoutProps> = ({ maxWidth="container.xl", height, children }) => {
  return (
    <Container maxW={maxWidth} py="8" height={height}>
      {children}
    </Container>
  );
};

export default PageLayout;