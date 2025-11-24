import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

const useLoadQuestionData = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error("没有问卷 ID");
      const data = await getQuestionService(id);
      return data; 
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (!data) return;

    const {
      title = "",
      desc = "",
      js = "",
      css = "",
      componentList = [],
      isPublished = false,
    } = data;

    let selectedId = "";
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }

    dispatch(
      resetComponents({
        componentList,
        selectedId,
        copiedComponent: null,
      }),
    );

    dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
  }, [data]);

  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, data, error };
};

export default useLoadQuestionData;
