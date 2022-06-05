import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Form/Button';
import {
  Container,
  Content,
  CreateAccount,
  CreateAccountTitle,
  ForgotPasswordButton,
  ForgotPasswordTitle,
  Icon,
  Logo,
  Title,
} from './styles';
import logo from '../../assets/logo.png';
import { InputControll } from '../../components/Form/InputControl/indext';
import { useAuth } from '../../context/AuthContext';

interface ScreenNavigationProp {
  navigate: (screem: string) => void;
}

interface IForm {
  [name: string]: any;
}

const formSchema = yup.object({
  email: yup.string().email('Email inválido.').required('Informe o email'),
  password: yup.string().required('Informe a senha.'),
});

export const SignIn: React.FunctionComponent = () => {
  const { SignIn } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const navigation = useNavigation<ScreenNavigationProp>();

  const handleSignIn = async (form: IForm) => {
    const data = {
      email: form.email,
      password: form.password,
    };
    setLoading(true);
    await SignIn(data);
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
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
            <Button
              title="Entrar"
              disabled={loading || errors.email || errors.password}
              onPress={handleSubmit(handleSignIn)}
            />
            <ForgotPasswordButton
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
