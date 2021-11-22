import styled from 'styled-components';
import {Text} from 'react-native';
import {fontSize} from 'util/sizes';
import color from 'util/colors';

const textBase = styled(Text)`
  margin: 0;
`;

const headerBase = styled(textBase)`
  font-weight: 800;
`;

export const H1 = styled(headerBase)`
  font-size: ${fontSize.XXL}px;
`;
export const H2 = styled(headerBase)`
  font-size: ${fontSize.XL}px;
`;
export const H3 = styled(headerBase)`
  font-size: ${fontSize.L}px;
`;
export const H4 = styled(headerBase)`
  font-size: ${fontSize.M}px;
`;
export const H5 = styled(headerBase)`
  font-size: ${fontSize.S}px;
`;
export const H6 = styled(headerBase)`
  font-size: ${fontSize.XS}px;
`;
export const P = styled(textBase)`
  font-size: ${fontSize.M}px;
`;

export const A = styled(Text)`
  color: ${color.primary};
  text-decoration-line: underline;
`;

export {default as Prompt} from './Prompts';