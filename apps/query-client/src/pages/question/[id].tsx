/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, FormEvent } from "react";
import styles from '../../styles/Question.module.scss'
import PageWrapper from "@/components/PageWrapper";
import { getQuestionById } from "@/services/question";
import { getComponent } from "@/components/QuestionComponents";

type Props = {
    errno: number
    data?: {
        _id: string
        title: string
        desc?: string
        js?: string
        css?: string
        isPublished: boolean
        isDeleted: boolean
        componentList: Array<any>
    }
    msg?: string
}

const Question: FC<Props> = (props) => {
    const { errno, data, msg = '' } = props

    if (errno !== 0) {
        return (
            <PageWrapper title="wrong">
                <h1>错误</h1>
                <p>{msg}</p>
            </PageWrapper>
        )
    }


    const { _id: id, title = '', desc = '', isDeleted, isPublished, componentList = [] } = data || {}

    if (isDeleted) {
        return (
            <PageWrapper title={title} desc={desc}>
                <h1>{title}</h1>
                <p>该问卷已被删除</p>
            </PageWrapper>
        )
    }
    if (!isPublished) {
        return (
            <PageWrapper title={title}>
                <h1>{title}</h1>
                <p>该问卷尚未发布</p>
            </PageWrapper>
        )
    }

    const ComponentListElem = (
        <>
            {componentList.map(c => {
                const ComponentElem = getComponent(c)
                return (
                    <div key={c.fe_id} className={styles.componentWrapper}>
                        {ComponentElem}
                    </div>
                )
            })}
        </>
    )


    return (
        <>
            <PageWrapper title={title}>
                <form method="post" action='/api/answer'>
                    {/* 通过 hidden input 的方式来提交 questionId */}
                    <input type="hidden" name='questionId' value={id} />
                    {ComponentListElem}
                    {/* <input type="submit" value='提交' /> */}
                    <div className={styles.submitBtnContainer}>
                        <button type="submit" className={styles.button}>提交</button>
                    </div>
                </form>
            </PageWrapper>
        </>
    )
}
export default Question

export async function getServerSideProps(context: any) {
    const { id = '' } = context.params

    const data = await getQuestionById(id)

    return {
        props: {
            ...data
        }
    }
}