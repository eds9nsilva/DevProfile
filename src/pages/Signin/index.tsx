import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from '../../components/Form/Button';
import { Input } from '../../components/Form/Input/indext';
import { Container, Content, Title } from './styles';

export const Signin: React.FunctionComponent = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Content>
          <Title>Faça seu logon</Title>
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
          <Button title="Entrar" />
        </Content>
      </Container>
    </ScrollView>
  );
};
