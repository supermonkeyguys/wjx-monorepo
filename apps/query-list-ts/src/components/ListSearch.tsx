import { Input } from "antd";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

const { Search } = Input;

const ListSearch: FC = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [value, setValue] = useState("");
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(newVal);
  }, [searchParams]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function handleSearch(value: string) {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <Search
      size="large"
      allowClear
      placeholder="请输入关键字"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
      style={{ width: "260px" }}
    />
  );
};

export default ListSearch;
