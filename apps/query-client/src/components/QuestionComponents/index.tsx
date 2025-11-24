import QuestionCheckbox from "./QuestionCheckbox/QuestionCheckbox"
import QuestionInfo from "./QuestionInfo/QuestionInfo"
import QuestionInput from "./QuestionInput/QuestionInput"
import QuestionParagraph from "./QuestionParagraph/QuestionParagraph"
import QuestionRadio from "./QuestionRadio/QuestionRadio"
import QuestionTextarea from "./QuestionTextarea/QuestionTextarea"
import QuestionTitle from "./QuestionTitle/QuestionTitle"


type ComponentInfoType = {
    fe_id: string
    type: string
    isHidden: boolean
    props: any
}

export const getComponent = (comp: ComponentInfoType) => {
    const { fe_id, type, isHidden, props = {} } = comp

    if (isHidden) return null

    if (type === 'questionTitle') {
        return <QuestionTitle {...props} />
    }

    if (type === 'questionInput') {
        return <QuestionInput fe_id={fe_id} props={props} />
    }

    if (type === 'questionRadio') {
        return <QuestionRadio fe_id={fe_id} props={props} />
    }

    if (type === 'questionParagraph') {
        return <QuestionParagraph {...props} />
    }

    if (type === 'questionInfo') {
        return <QuestionInfo {...props} />
    }

    if (type === 'questionTextarea') {
        return <QuestionTextarea fe_id={fe_id} props={props} />
    }

    if (type === 'questionCheckbox') {
        return <QuestionCheckbox fe_id={fe_id} props={props} />
    }

    return null
}