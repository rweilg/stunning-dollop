import React from "react";
import {
  Box,
  Flex,
  HStack,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Layout({ title, children, icons }) {
  const mainBG = useColorModeValue("brand.bgLight", "#232529");
  const borderColor = useColorModeValue(
    "brand.sidebarBordrLight",
    "brand.sidebarBorderDark"
  );
  return (
    <Grid
      h="100vh"
      w="100%"
      templateRows={["12% 1fr 5%", "10% 1fr", "72px 1fr"]}
      bg={mainBG}
    >
      <GridItem colSpan={1} px={[4, 6, 10]} borderColor={borderColor}>
        <Flex
          w="100%"
          h="100%"
          align="center"
          mt={[2, 0, 0]}
          justify="space-between"
        >
          <Flex>
            <HStack spacing={[0, 4, 4]}>
              {icons != undefined &&
                icons.map((icon) => {
                  return <Flex w={["80px", "auto", "auto"]}>{icon}</Flex>;
                })}
            </HStack>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem
        px={[0, 6, 8]}
        display={["block", "flex"]}
        flexDirection="column"
        py={[4, 8, 8]}
        overflow={["scroll", "hidden"]}
      >
        {children}
        <Box display={["block", "block", "none"]} width="100%" h={16} />
      </GridItem>
    </Grid>
  );
}
