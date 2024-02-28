import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

// 型定義
type SelectedDonsContextProps = {
  fullPropertyDons: any;
  setFullDons: (dons: any) => void;
};

type FullPropertyDonsProviderProps = {
  children: ReactNode;
};

// 初期値の設定
const SelectedDonsContext = createContext<SelectedDonsContextProps | undefined>(
  {
    fullPropertyDons: null,
    setFullDons: () => {},
  }
);

export const FullPropertyDonsProvider: FC<FullPropertyDonsProviderProps> = ({
  children,
}) => {
  // state管理
  const [fullPropertyDons, setFullPropertyDons] = useState<any | null>(null);

  // setDons関数
  const setFullDons = (dons: any) => {
    setFullPropertyDons(dons);
    console.log("fullPropertyDons", fullPropertyDons);
  };

  // コンテキスト作成
  return (
    <SelectedDonsContext.Provider value={{ fullPropertyDons, setFullDons }}>
      {children}
    </SelectedDonsContext.Provider>
  );
};

export const useFullPropertyDons = () => {
  const context = useContext(SelectedDonsContext);
  // コンテキストがなければスルー
  if (!context) {
    throw new Error("");
  }
  // コンテキストを返す
  return context;
};
