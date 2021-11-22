import React from 'react';
import { Row } from "components/Views";
import styled from "styled-components";
import { hexToRGB } from "util/helperFunctions";
import { gap } from "util/sizes";
import color from "util/colors";
import { P } from ".";

const PromptContainer = styled(Row)`
  border-radius: ${gap.S}px;
  padding: ${gap.S}px ${gap.M}px;
  background-color: ${(props: {color: string}) => hexToRGB(props.color, 0.1)};
  margin-top: ${gap.S}px;
`

const BasePrompt = (props: any) => (
  <PromptContainer {...props} color={props.color}>
    <P style={{color: props.color}}>{props.children}</P>
  </PromptContainer>
);

export const ErrorPrompt = (props: any) => (
  <BasePrompt color={color.error} {...props} />
);

export const SuccessPrompt = (props: any) => (
  <BasePrompt color={color.success} {...props} />
);

const Prompt = {Success: SuccessPrompt, Error: ErrorPrompt}

export default Prompt;