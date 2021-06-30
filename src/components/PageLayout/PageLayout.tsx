import React from "react"
import { Container } from "@chakra-ui/react"

interface PageLayoutProps {
  maxWidth?: string
}

const PageLayout: React.FC<PageLayoutProps> = ({ maxWidth="container.xl", children }) => {
  return (
    <Container maxW={maxWidth} py="8">
      {children}
    </Container>
  );
};

export default PageLayout;