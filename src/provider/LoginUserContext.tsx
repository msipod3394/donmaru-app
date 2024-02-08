import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { DBUser } from "@/types/global_db.types";

type LoginUserContextProps = {
  loginUser: DBUser;
  setUser: (user: DBUser) => void;
};

type LoginUserProviderProps = {
  children: ReactNode;
};

// コンテキスト作成、初期値を設定
const LoginUserContext = createContext<LoginUserContextProps | undefined>({
  loginUser: {
    id: "",
    email: "",
    user_name: "",
    password: "",
    created_at: "",
    updated_at: "",
  },
  setUser: () => {},
});

export const LoginUserProvider: FC<LoginUserProviderProps> = ({ children }) => {
  // localStorageが利用可能か判定
  const checkUseLocalStorage = typeof window !== "undefined";

  // state管理
  const [loginUser, setLoginUser] = useState<DBUser>(() => {
    if (checkUseLocalStorage) {
      const storedUser = localStorage.getItem("loginUser");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // ストレージに保存
  useEffect(() => {
    if (checkUseLocalStorage) {
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
    }
    console.log("ログイン情報", loginUser);
  }, [checkUseLocalStorage, loginUser]);

  // loginUserを更新
  const setUser = (user: DBUser) => {
    setLoginUser(user);
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
  if (!context) {
    throw new Error("");
  }
  return context;
};
