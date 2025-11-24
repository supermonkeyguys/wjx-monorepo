/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userSlice";
import { getToken } from "../utils/user-token";

const useLoadUserData = () => {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  const token = getToken();
  const { username } = useGetUserInfo();
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    } else if (token) run();
    else setWaitingUserData(false);
  }, [username, token]);

  return { waitingUserData };
};

export default useLoadUserData;
