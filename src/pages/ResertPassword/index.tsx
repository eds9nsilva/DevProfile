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
import { InputControl } from '../../components/Form/InputControl';
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

export const ResertPassword: React.FunctionComponent = () => {
  interface ScreenNavigationProp {
    navigate: (screem: string) => void;
  }

  interface IForm {
    [name: string]: any;
  }

  const formSchema = yup.object({
    token: yup.string().uuid('Código inválido.').required('Informe o código'),
    password: yup.string().required('Informe a nova senha.'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Confirmação incorreta.'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const navigation = useNavigation<ScreenNavigationProp>();
  const handleResetPassword = async (form: IForm) => {
    const data = {
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };
    try {
      await api.post('password/reset', data);
      Alert.alert(
        'Senha redefinida',
        'A senha foi redefinida com sucesso. Efetue o login para acessar.',
      );
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert(
        'Erro resetar senha',
        'Ocorreu um erro ao resertar sua senha. Tente novamente.',
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
            <Title>Redefinir senha</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="token"
              placeholder="Código"
              error={errors.token && errors.token.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="password_confirmation"
              placeholder="Senha"
              secureTextEntry
              error={
                errors.password_confirmation &&
                errors.password_confirmation.message
              }
            />
            <Button
              title="Redifinir senha"
              onPress={handleSubmit(handleResetPassword)}
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
