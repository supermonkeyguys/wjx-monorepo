import { useMemo, useRef, type FC } from "react";
import {
  Button,
  Input,
  message,
  Popover,
  QRCode,
  Space,
  Tooltip,
  type InputRef,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import useGetPageInfo from "../../../Hooks/useGetPageInfo";
import Title from "antd/es/typography/Title";
import styles from "./StatHeader.module.scss";

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { title, isPublished = true } = useGetPageInfo();
  const urlInputRef = useRef<InputRef>(null);

  async function handleCopy() {
    console.log(urlInputRef)
    const elem = urlInputRef.current;
    if (elem == null || elem.input == null) return;

    // 通用 老环境 旧版浏览器
    // document.execCommand('copy')

    try {
      await navigator.clipboard.writeText(elem.input.value);
      message.success("复制成功");
    } catch (err) {
      message.error("复制失败");
      console.log(err);
    }
  }

  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    const url = `http://localhost:3000/question/${id}`;

    const QRCodeElem = <QRCode value={url || "-"} />;

    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: "300px" }} />
        <Tooltip title="拷贝链接">
          <Button
            shape="default"
            icon={<CopyOutlined />}
            onClick={handleCopy}
          />
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button shape="default" icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }, [id, isPublished]);

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space align="baseline">
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
