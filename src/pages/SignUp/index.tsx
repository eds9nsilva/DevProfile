import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/Form/Button';
import { InputControll } from '../../components/Form/InputControl/indext';
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

  interface IForm {
    [name: string]: any;
  }

  const formSchema = yup.object({
    email: yup.string().email('Email inválido.').required('Informe o email'),
    name: yup.string().required('Informe o nome completo'),
    password: yup.string().required('Informe a senha.'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const navigation = useNavigation<ScreenNavigationProp>();
  const handleSignUp = (form: IForm) => {
    const data = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    console.log(data);
  };
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
            <InputControll
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome Completo"
              error={errors.name && errors.name.message}
            />
            <InputControll
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="E-mail"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <InputControll
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <Button title="Criar conta" onPress={handleSubmit(handleSignUp)} />
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
