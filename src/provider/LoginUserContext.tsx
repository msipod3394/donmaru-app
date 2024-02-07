import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";

// 型定義
type LoginUserContextProps = {
  loginUser: any;
  setUser: (dons: any) => void;
};

type LoginUserProviderProps = {
  children: ReactNode;
};

// 初期値の設定
const LoginUserContext = createContext<LoginUserContextProps | undefined>({
  loginUser: null,
  setUser: () => {},
});

export const LoginUserProvider: FC<LoginUserProviderProps> = ({ children }) => {
  // state管理
  const [loginUser, setLoginUser] = useState<any | null>(() => {
    // localStorageが利用可能かどうかを確認してからデータを取得する
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loginUser");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    // localStorageが利用可能かどうかを確認してから保存する
    if (typeof window !== "undefined") {
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
    }

    console.log(loginUser);
    
  }, [loginUser]);

  // setUser関数
  const setUser = (dons: any) => {
    setLoginUser(dons);
  };

  // コンテキスト作成
  return (
    <LoginUserContext.Provider value={{ loginUser, setUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export const useLoginUser = () => {
  const context = useContext(LoginUserContext);
  // コンテキストがなければスルー
  if (!context) {
    throw new Error("");
  }
  // コンテキストを返す
  return context;
};
