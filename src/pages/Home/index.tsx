import React from 'react';
import {
  Container,
  Header,
  UserAvatar,
  UserAvatarButton,
  UserGreeting,
  UserInfo,
  UserInfoDetail,
  UserName,
  UserWrapper,
  Icon,
} from './styles';
import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';

export const Home: React.FunctionComponent = () => {
  const { user } = useAuth();
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar
                source={
                  user.avatar_url ? { uri: user.avatar_url } : avatarDefault
                }
              />
            </UserAvatarButton>
            <UserInfoDetail>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </UserInfoDetail>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
};
