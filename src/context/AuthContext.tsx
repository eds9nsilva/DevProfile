import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api } from '../services/api';
import { IUser } from '../model/user';

interface IAuthStates {
  token: string;
  user: IUser;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  SignIn(credentials: ICredentials): void;
  SignOut(): void;
}

interface IProps {
  children: React.ReactElement;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

const tokenData = '@DevProfile:token';
const userData = '@DevProfile:user';

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const [data, setData] = React.useState<IAuthStates>({} as IAuthStates);

  React.useEffect(() => {
    async function loadAuthData() {
      const token = await AsyncStorage.getItem(tokenData);
      const user = await AsyncStorage.getItem(userData);
      if (token && user) {
        setData({ token, user: JSON.parse(user) });
      }
    }
    loadAuthData();
  }, []);

  const SignIn = async ({ email, password }: ICredentials) => {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });
      const { token, user } = response.data;
      await AsyncStorage.setItem(tokenData, token);
      await AsyncStorage.setItem(userData, JSON.stringify(user));
      setData({ token, user });
    } catch (error) {
      Alert.alert(
        'Erro na autenticação',
        'ocorreu um erro ao fazer login, verifique as credenciais.',
      );
    }
  };

  const SignOut = async () => {
    await AsyncStorage.removeItem(tokenData);
    await AsyncStorage.removeItem(userData);
    setData({} as IAuthStates);
  };
  return (
    <AuthContext.Provider value={{ user: data.user, SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado em um AuthProvider');
  }
  return context;
};
