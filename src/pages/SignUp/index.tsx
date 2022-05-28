import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input';
import {
  BackToSgnin,
  BackToSgninTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
} from './styles';
import logo from '../../assets/logo.png';

export const SignUp: React.FunctionComponent = () => {
  interface ScreenNavigationProp {
    navigate: (screem: string) => void;
  }

  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Container>
          <Content>
            <Logo source={logo} />
            <Title>Crie sua conta</Title>
            <Input placeholder="Nome completo" />
            <Input placeholder="E-mail" />
            <Input placeholder="Senha" />
            <Button title="Criar conta" />
          </Content>
        </Container>
      </ScrollView>
      <BackToSgnin
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        <Icon name="arrow-left" />
        <BackToSgninTitle>Voltar para logon</BackToSgninTitle>
      </BackToSgnin>
    </KeyboardAvoidingView>
  );
};
