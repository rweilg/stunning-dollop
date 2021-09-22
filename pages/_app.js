import "../styles/globals.css";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import morph from "../lib/theme/index";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={morph}>
      <Flex w={"100vw"} h={"100vh"} m={0} p={0}>
        <Flex flexBasis={"initial"} flexShrink={"initial"} flexGrow={1}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent="center"
            p={0}
            w={"100%"}
            h={"100vh"}
          >
            <Component {...pageProps} />
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default MyApp;
