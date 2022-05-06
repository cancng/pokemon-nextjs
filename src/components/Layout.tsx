import { Container } from "@mantine/core";
import { ReactNode } from "react";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <Container size="lg" mt="lg">
        {children}
      </Container>
    </>
  );
}

export default Layout;
