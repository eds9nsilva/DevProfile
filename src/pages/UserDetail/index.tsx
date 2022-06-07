import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

import {
  Container,
  Content,
  ContentTitle,
  EmailData,
  EmailTitle,
  GoBackButton,
  Header,
  HeaderTitle,
  Icon,
  NameData,
  NameTitle,
  UserAvatar,
  UserDetailAvatar,
  UserEmailDetail,
  UserNameDetail,
} from './styles';
import { IUser } from '../../model/user';
import { api } from '../../services/api';

import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';

interface RouterParams {
  userId: string;
}

interface ScreenNavigationProp {
  goBack: () => void;
}

export const UserDetails: React.FunctionComponent = () => {
  const [useDetails, setUserDetails] = React.useState<IUser>({} as IUser);
  const route = useRoute();
  const { userId } = route.params as RouterParams;
  const { user } = useAuth();
  const { goBack } = useNavigation<ScreenNavigationProp>();
  React.useEffect(() => {
    const loadUser = async () => {
      const response = await api.get(`/users/${userId}`);
      setUserDetails(response.data);
    };
    loadUser();
  }, [userId]);
  return (
    <Container>
      <Header>
        <GoBackButton onPress={goBack}>
          <Icon name="chevron-left" />
        </GoBackButton>
        <HeaderTitle>Usuario</HeaderTitle>
        <UserAvatar
          source={user.avatar_url ? { uri: user.avatar_url } : avatarDefault}
        />
      </Header>
      <Content>
        <ContentTitle>Detalhes do usuário</ContentTitle>
        <UserDetailAvatar
          source={
            useDetails.avatar_url
              ? { uri: useDetails.avatar_url }
              : avatarDefault
          }
        />

        <UserNameDetail>
          <NameTitle>Name</NameTitle>
          <NameData>{useDetails.name}</NameData>
        </UserNameDetail>
        <UserEmailDetail>
          <EmailTitle>EMAIL</EmailTitle>
          <EmailData>{useDetails.email}</EmailData>
        </UserEmailDetail>
      </Content>
    </Container>
  );
};
