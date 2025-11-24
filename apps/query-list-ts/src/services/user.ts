import axios, { type ResDataType } from "./ajax";

type UserProps = {
  username: string;
  password: string;
  nickname: string;
};

export async function getUserInfoService(): Promise<ResDataType> {
  const url = "/api/user/info";
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

export async function registerUserService(
  props: UserProps,
): Promise<ResDataType> {
  const { username, password, nickname } = props;
  const url = "/api/user/register";
  const data = await axios.post(url, {
    data: { username, password, nickname },
  });
  return data;
}

export async function loginUserService(
  props: Partial<UserProps>,
): Promise<ResDataType> {
  const { username, password,} = props;
  // console.log('🚀 登录请求参数:', { username, password }); // 👈 加这行！
  const url = "/api/user/login";
  const data = await axios.post(url, { username, password });
  return data;
}
