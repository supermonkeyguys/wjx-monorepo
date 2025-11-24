import { CSSProperties, FC } from "react";
import { QuestionParagraphPropsType as PropsType } from "@my-repo/types";

const QuestionParagraph: FC<PropsType> = (props) => {
    const { text, isCenter } = props

    const style: CSSProperties = {}
    if (isCenter) style.textAlign = 'center'

    const textList = text!.split('\n')

    return (
        <p style={style}>
            {textList.map((t, index) => (
                <span key={index}>
                    {index > 0 && <br />}
                    {t}
                </span>
            ))}
        </p>
    )
}

export default QuestionParagraph