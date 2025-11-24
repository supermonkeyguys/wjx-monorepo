import { FC } from "react";
import styles from './QuestionRadio.module.scss'
import { QuestionRadio as PropsType } from "@my-repo/types";


const QuestionRadio: FC<PropsType> = ({ fe_id, props }) => {
    const { title, options = [], value, isVertical } = props

    return (
        <>
            <p>{title}</p>
            <ul className={styles.list}>
                {options.map(opt => {
                    const { value: val, text } = opt
                    let className = ''
                    if (isVertical) className = styles.verticalItem
                    else className = styles.horizontalItem
                    return (
                        <li key={val} className={className}>
                            <label>
                                <input type="radio" name={fe_id} value={val} defaultChecked={val === value} />
                                {text}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default QuestionRadio