import { useEffect } from "react";

const useTitle = (title: string, keepOnUnmount: boolean = false) => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = title;

    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [title, keepOnUnmount]);
};

export default useTitle;
