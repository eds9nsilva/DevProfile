import React from 'react';
import AvatarDefault from '../../assets/avatar02.png';
import {
  Container,
  EmailData,
  EmailTitle,
  NameData,
  NameTitle,
  UserAvatar,
  UserDetail,
  UserEmailDetail,
  UserNameDetail,
} from './styles';

export const User: React.FunctionComponent = () => {
  return (
    <Container>
      <UserDetail>
        <UserNameDetail>
          <NameTitle> Edson </NameTitle>
          <NameData> Edson developer </NameData>
        </UserNameDetail>
        <UserEmailDetail>
          <EmailTitle> Email </EmailTitle>
          <EmailData> Email de Edson </EmailData>
        </UserEmailDetail>
      </UserDetail>
      <UserAvatar />
    </Container>
  );
};
