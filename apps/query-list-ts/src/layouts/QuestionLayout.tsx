import type { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../Hooks/useLoadUserData";
import { Spin } from "antd";

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();

  return <>{waitingUserData ? <Spin /> : <Outlet />}</>;
};

export default QuestionLayout;
