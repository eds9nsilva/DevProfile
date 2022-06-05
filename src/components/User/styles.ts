import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

export const Container = styled.view`
  width: 100%;
  height: ${RFValue(100)}px;
  background-color: ${({ theme }) => theme.colors.gray800};
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 8px 0;
`;

export const UserDetail = styled.view``;

export const UserNameDetail = styled.view`
  margin-bottom: 16px;
`;

export const NameTitle = styled.text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(8)}px;
  text-transform: uppercase;
`;

export const NameData = styled.text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(14)}px;
`;

export const UserEmailDetail = styled.view``;

export const EmailTitle = styled.text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(8)}px;
  text-transform: uppercase;
`;

export const EmailData = styled.view`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(14)}px;
`;

export const UserAvatar = styled.image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;
