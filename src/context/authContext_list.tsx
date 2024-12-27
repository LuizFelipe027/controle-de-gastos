import React, { createContext } from "react";
import { Alert } from "react-native";

export const AuthContextList: any = React.createContext({});

export const AuthProviderList = (props: any): any => {

  const onOpen = () => {
    Alert.alert("Atenção", "Modal aberto");
  }


  return (
    <AuthContextList.Provider value={{onOpen}}>
      {props.children}
    </AuthContextList.Provider>
  );
};


export const useAuth = () => React.useContext(AuthContextList);