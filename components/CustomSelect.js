import React, { cloneElement, forwardRef } from "react";
import ReactSelect, {
  components,
  components as selectComponents,
} from "react-select";
import AsyncReactSelect from "react-select/async";
import CreatableReactSelect from "react-select/creatable";
import {
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Divider,
  CloseButton,
  Center,
  Box,
  Portal,
  StylesProvider,
  useMultiStyleConfig,
  useStyles,
  useTheme,
  useColorModeValue,
  createIcon,
  Img,
  Circle,
  Text,
} from "@chakra-ui/react";

// Taken from the @chakra-ui/icons package to prevent needing it as a dependency
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx
const ChevronDown = createIcon({
  displayName: "ChevronDownIcon",
  d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
});

// Custom styles for components which do not have a chakra equivalent
const chakraStyles = {
  input: (provided) => ({
    ...provided,
    color: "inherit",
    lineHeight: 1,
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: "none",
    background: "rgba(0,0,0,0)",
  }),
  // pill, selected value container
  valueContainer: (provided, { selectProps: { size } }) => {
    //  PLACEHOLDER AND PILL MARGIN
    const px = {
      sm: "0.75rem",
      md: "16px",
      lg: "1rem",
    };

    return {
      ...provided,
      //  PADDING
      padding: `0.125rem ${px[size]}`,
      background: "#141419",
    };
  },
  loadingMessage: (provided, { selectProps: { size } }) => {
    const fontSizes = {
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
    };

    const paddings = {
      sm: "6px 9px",
      md: "8px 12px",
      lg: "10px 15px",
    };

    const margins = {
      sm: "6px 9px",
      md: "0px 30px",
      lg: "10px 15px",
    };

    return {
      ...provided,
      fontSize: fontSizes[size],
      padding: paddings[size],
      margin: margins[size],
    };
  },
  // Add the chakra style for when a TagCloseButton has focus
  multiValueRemove: (
    provided,
    { isFocused, selectProps: { multiValueRemoveFocusStyle } }
  ) => (isFocused ? multiValueRemoveFocusStyle : {}),
  control: () => ({}),
  menuList: () => ({}),
  option: () => ({}),
  multiValue: () => ({}),
  multiValueLabel: () => ({}),
  group: () => ({}),
};

const chakraComponents = {
  // Control components
  Control: ({
    children,
    innerRef,
    innerProps,
    isDisabled,
    isFocused,
    selectProps: { size },
  }) => {
    const inputStyles = useMultiStyleConfig("Input", { size });

    const heights = {
      sm: 8,
      md: 10,
      lg: 12,
    };

    return (
      //  SELECT CONTAINER
      <StylesProvider value={inputStyles}>
        <Flex
          ref={innerRef}
          sx={{
            ...inputStyles.field,
            p: 0,
            overflow: "hidden",
            h: "auto",
            minH: "42px",
          }}
          {...innerProps}
          {...(isFocused && { "data-focus": true })}
          {...(isDisabled && { disabled: true })}
        >
          {children}
        </Flex>
      </StylesProvider>
    );
  },
  MultiValueContainer: ({
    children,
    innerRef,
    innerProps,
    data,
    selectProps,
    ...props
  }) => (
    //  PILL
    <Tag
      ref={innerRef}
      {...innerProps}
      m="0.125rem"
      px="10px"
      py="5px"
      borderRadius={data.url ? "full" : "8px"}
      bg={data.color ? data.color : "rgba(255, 255, 255, 0.1)"}
      color={data.text ? data.text : null}
      // react-select Fixed Options example: https://react-select.com/home#fixed-options
      variant={data.isFixed ? "solid" : "subtle"}
      colorScheme={data.colorScheme || selectProps.colorScheme}
      size={selectProps.size}
    >
      {data.url && (
        <Img
          borderRadius="full"
          boxSize="22px"
          mr={"12px"}
          src={data.url}
          alt="pic"
          display="inline"
        />
      )}
      {children}
    </Tag>
  ),
  MultiValueLabel: ({ children, innerRef, innerProps }) => (
    <TagLabel ref={innerRef} {...innerProps}>
      {children}
    </TagLabel>
  ),
  MultiValueRemove: ({ children, innerRef, innerProps, data: { isFixed } }) => {
    if (isFixed) {
      return null;
    }

    return (
      <TagCloseButton ref={innerRef} {...innerProps} tabIndex={-1}>
        {children}
      </TagCloseButton>
    );
  },
  IndicatorSeparator: ({ innerProps }) => (
    <Divider {...innerProps} orientation="vertical" opacity="1" />
  ),
  ClearIndicator: ({ innerProps, selectProps: { size } }) => (
    <CloseButton {...innerProps} size={size} mx={2} tabIndex={-1} />
  ),
  DropdownIndicator: ({ innerProps, selectProps: { size } }) => {
    const { addon } = useStyles();

    const iconSizes = {
      sm: 4,
      md: 5,
      lg: 6,
    };
    const iconSize = iconSizes[size];

    return (
      //   DROPDOWN BUTTON
      <Center
        {...innerProps}
        sx={{
          ...addon,
          h: "100%",
          borderRadius: 0,
          borderWidth: 0,
          cursor: "pointer",
          bg: "brand.bg",
        }}
      >
        <ChevronDown h={iconSize} w={iconSize} />
      </Center>
    );
  },
  // Menu components
  MenuPortal: ({ children }) => <Portal>{children}</Portal>,
  Menu: ({ children, ...props }) => {
    const menuStyles = useMultiStyleConfig("Menu");
    return (
      <selectComponents.Menu {...props}>
        <StylesProvider value={menuStyles}>{children}</StylesProvider>
      </selectComponents.Menu>
    );
  },
  MenuList: ({ innerRef, children, maxHeight, selectProps: { size } }) => {
    const { list } = useStyles();
    const chakraTheme = useTheme();

    const borderRadii = {
      sm: chakraTheme.radii.sm,
      md: chakraTheme.radii.md,
      lg: chakraTheme.radii.md,
    };

    // popover list container that opens
    return (
      <Box
        sx={{
          ...list,
          maxH: `${200}px`,
          overflowY: "auto",
          background: "#141419",
          px: "8px",
          borderRadius: borderRadii[size],
          zIndex: 20,
        }}
        ref={innerRef}
      >
        {children}
      </Box>
    );
  },
  GroupHeading: ({ innerProps, children }) => {
    const { groupTitle } = useStyles();
    return (
      <Box sx={groupTitle} {...innerProps}>
        {children}
      </Box>
    );
  },
  Option: ({
    innerRef,
    innerProps,
    children,
    isFocused,
    isDisabled,
    selectProps: { size },
    ...props
  }) => {
    const { item } = useStyles();
    const { data } = props;
    return (
      // CELL
      <Box
        role="button"
        sx={{
          ...item,
          w: "100%",
          textAlign: "left",
          borderRadius: `6px`,
          bg: isFocused ? item._focus.bg : "transparent",
          fontSize: size,
          ...(isDisabled && item._disabled),
        }}
        ref={innerRef}
        {...innerProps}
        {...(isDisabled && { disabled: true })}
      >
        {/*         <Img
          borderRadius="full"
          boxSize="24px"
          mr={"12px"}
          src={data.url}
          alt="pic"
          display="inline"
        /> */}
        {data.color && (
          <Flex direction="row" align="center">
            <Text> {data.label} </Text>
          </Flex>
        )}
        {!data.color && children}
      </Box>
    );
  },
  /*   Placeholder: ({ children, props }) => {
    const { itemStyles } = useStyles();
    return (
      <Box sx={{ ...itemStyles }} opacity={0.3} {...props}>
        {children}
      </Box>
    );
  }, */
};

const ChakraReactSelect = ({
  children,
  styles = {},
  components = {},
  theme = () => ({}),
  //  placeholder
  size = "md",
  colorScheme = "gray",
  ...props
}) => {
  const chakraTheme = useTheme();

  // The chakra theme styles for TagCloseButton when focused
  const closeButtonFocus =
    chakraTheme.components.Tag.baseStyle.closeButton._focus;
  const multiValueRemoveFocusStyle = {
    background: closeButtonFocus.bg,
    boxShadow: chakraTheme.shadows[closeButtonFocus.boxShadow],
  };

  // The chakra UI global placeholder color
  // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
  const placeholderColor = useColorModeValue(
    chakraTheme.colors.gray[400],
    chakraTheme.colors.whiteAlpha[400]
  );

  // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
  let realSize = size;
  const sizeOptions = ["sm", "md", "lg"];
  if (!sizeOptions.includes(size)) {
    realSize = "md";
  }

  const select = cloneElement(children, {
    components: {
      ...chakraComponents,
      ...components,
    },
    styles: {
      ...chakraStyles,
      ...styles,
    },
    placeholder: {
      ...chakraComponents,
    },
    theme: (baseTheme) => {
      const propTheme = theme(baseTheme);

      return {
        ...baseTheme,
        ...propTheme,
        colors: {
          ...baseTheme.colors,
          neutral50: placeholderColor, // placeholder text color
          neutral40: placeholderColor, // noOptionsMessage color
          ...propTheme.colors,
        },
        spacing: {
          ...baseTheme.spacing,
          ...propTheme.spacing,
        },
      };
    },
    colorScheme,
    size: realSize,
    multiValueRemoveFocusStyle,
    ...props,
  });

  return select;
};

const Select = forwardRef((props, ref) => (
  <ChakraReactSelect {...props}>
    <ReactSelect ref={ref} />
  </ChakraReactSelect>
));

const AsyncSelect = forwardRef((props, ref) => (
  <ChakraReactSelect {...props}>
    <AsyncReactSelect ref={ref} />
  </ChakraReactSelect>
));

const CreatableSelect = forwardRef((props, ref) => (
  <ChakraReactSelect {...props}>
    <CreatableReactSelect ref={ref} />
  </ChakraReactSelect>
));

export { Select as default, AsyncSelect, CreatableSelect };
