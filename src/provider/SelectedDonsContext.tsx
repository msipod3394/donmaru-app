import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";

// 型定義
type SelectedDonsContextProps = {
  selectedDons: any;
  setDons: (dons: any) => void;
};

type SelectedDonsProviderProps = {
  children: ReactNode;
};

// 初期値の設定
const SelectedDonsContext = createContext<SelectedDonsContextProps | undefined>(
  {
    selectedDons: null,
    setDons: () => {},
  }
);

export const SelectedDonsProvider: FC<SelectedDonsProviderProps> = ({
  children,
}) => {
  // state管理
  const [selectedDons, setSelectedDons] = useState<any | null>(null);

  // setDons関数
  const setDons = (dons: any) => {
    console.log("setDons");

    setSelectedDons(dons);
  };

  // コンテキスト作成
  return (
    <SelectedDonsContext.Provider value={{ selectedDons, setDons }}>
      {children}
    </SelectedDonsContext.Provider>
  );
};

export const useSelectedDons = () => {
  const context = useContext(SelectedDonsContext);
  // コンテキストがなければスルー
  if (!context) {
    throw new Error("");
  }
  // コンテキストを返す
  return context;
};
