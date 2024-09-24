import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface UserInfo {
  id: number;
  email: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
}

interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("User 컨텍스트를 호출할 수 없는 범위입니다.");
  }

  return context;
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const contextValue = useMemo(() => ({ userInfo, setUserInfo }), [userInfo]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
