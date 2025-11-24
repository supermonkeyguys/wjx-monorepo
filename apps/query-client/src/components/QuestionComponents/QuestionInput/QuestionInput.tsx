import { FC } from "react";
import styles from './QuestionInput.module.scss'
import { QuestionInput as PropsType } from "@my-repo/types";

const QuestionInput: FC<PropsType> = ({ fe_id, props }) => {
    const { title, placeholder } = props

    return (
        <>
            <p>{title}</p>
            <div className={styles.inputWrapper}>
                <input name={fe_id} placeholder={placeholder} />
            </div>
        </>
    )
}

export default QuestionInput