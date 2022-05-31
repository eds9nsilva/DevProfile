import React from 'react';

interface IAuthContext {
  name: string;
  SignIn(): void;
}

interface IProps {
  children: React.ReactElement;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

export const AuthProvider: React.FunctionComponent<IProps> = ({ children }) => {
  const SignIn = () => {
    console.log('Contexto ');
  };

  return (
    <AuthContext.Provider value={{ name: 'Edson', SignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
