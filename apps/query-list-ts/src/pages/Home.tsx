import { Button, Typography } from "antd";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { LIST_PATHNAME } from "../router";
import styles from "./Home.module.scss";
// import '../_mock .js/index'

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();
  // useEffect(() => {
  //     // mock.js只能劫持 XMLHttpRequest，不能劫持 fetch
  //     // fetch('/api/test')
  //     //     .then(res => res.json())
  //     //     .then(data => console.log('fetch data', data))

  //     // axios 内部使用 XMLRequest API , 没用 fetch
  //     console.log(1);
  //     axios.get('/api/test')
  //         .then(res => console.log('axios res', res.data))
  //         .catch(err => console.log(new Error(err)))
  // }, [])

  function clickHandler(path: string) {
    nav(path);
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份, 发布问卷 90 份, 收到答卷 980 份
        </Paragraph>
        <div className={styles.button}>
          <Button type="primary" onClick={() => clickHandler(LIST_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
