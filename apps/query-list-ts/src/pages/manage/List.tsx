/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { Empty, message, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { getQuestionListService, updateQuestionService } from "../../services/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;


const List2 = () => {
  useTitle("Cookie问卷-我的问卷");

  // 优化
  const [started, setStarted] = useState(false); //检测是否已经加载

  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const haveMoreData = total > list!.length;

  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
    load()
  }, [keyword]);

  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: newList = [], count = 0 } = result;
        setList((list) => list.concat(newList));
        setTotal(count);
        setPage((page) => page + 1);
      },
    },
  );

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domRect = elem.getBoundingClientRect();
      if (domRect == null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 500,
    },
  );

  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }

    return () => window.removeEventListener("scroll", tryLoadMore);
  }, [page, keyword, haveMoreData]);

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>...没有更多了</span>;
    return <span>加载下一页中...</span>;
  }, [started, loading, total, haveMoreData]);

  const deleteQuestion = async (id: string) => {
    const prevList = [...list]
    const prevTotal = total

    setList(list => list.filter((l: any) => l._id !== id))
    setTotal(total => total - 1)

    try {
      await updateQuestionService(id, { isDeleted: true })
      message.success('删除成功')
    } catch (err) {
      setList(prevList)
      setTotal(prevTotal)
      message.error('删除失败, 请重试')
      console.log(err)
    }
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3} style={{ margin: 0 }}>
            我的问卷
          </Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} handleDel={deleteQuestion} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List2;
