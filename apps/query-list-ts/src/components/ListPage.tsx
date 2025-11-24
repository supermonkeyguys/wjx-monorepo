import { Pagination } from "antd";
import { useEffect, useState, type FC } from "react";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type PropType = {
  total: number;
};

const ListPage: FC<PropType> = (props: PropType) => {
  const { total } = props;
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") || 10;
    setPageSize(pageSize);
  }, [searchParams]);

  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  );
};

export default ListPage;
