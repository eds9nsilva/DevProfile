import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/Form/Button';
import { InputControll } from '../../components/Form/InputControl/indext';
import { api } from '../../services/api';
import {
  BackToSgnin,
  BackToSgninTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
} from '../SignUp/styles';
import logo from '../../assets/logo.png';

export const ForgotPassword: React.FunctionComponent = () => {
  interface ScreenNavigationProp {
    navigate: (screem: string) => void;
  }

  interface IForm {
    [name: string]: any;
  }

  const formSchema = yup.object({
    email: yup.string().email('Email inválido.').required('Informe o email'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const navigation = useNavigation<ScreenNavigationProp>();
  const handleForgotPassword = async (form: IForm) => {
    const data = {
      email: form.email,
    };
    try {
      await api.post('password/forgot', data);
      Alert.alert(
        'E-mail enviado',
        'Você receberar email com as instruções para redefinição da senha.',
      );
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert(
        'Erro no envio de email',
        'Ocorreu um erro ao enviar o email. Tente novamente',
      );
    }
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
            <Title>Esqueci minha senha</Title>
            <InputControll
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="E-mail"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <Button
              title="Enviar"
              onPress={handleSubmit(handleForgotPassword)}
            />
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
