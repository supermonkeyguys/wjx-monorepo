import type {
    QuestionCheckboxPropsType,
    QuestionInfoPropsType,
    QuestionInputPropsType, 
    QuestionParagraphPropsType, 
    QuestionRadioPropsType,
    QuestionTextareaPropsType,
    QuestionTitlePropsType
} from "@Cookie-repo/types";

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
    title: "多选框",
    isVertical: false,
    list: [
        { value: "item1", text: "选项1", checked: false },
        { value: "item2", text: "选项2", checked: false },
        { value: "item3", text: "选项3", checked: false },
    ],
};

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
    title: "问卷标题",
    description: "问卷描述",
};

export const QuestionInputDefaultProp: QuestionInputPropsType = {
    title: "输入框标题",
    placeholder: "请输入...",
};

export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
    text: "一行段落",
    isCenter: false,
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
    title: "单选标题",
    isVertical: false,
    options: [
        { value: "item1", text: "选项1" },
        { value: "item2", text: "选项2" },
        { value: "item3", text: "选项3" },
    ],
    value: "",
};

export const QuestionTextareaDefaultProp: QuestionTextareaPropsType = {
    title: "输入框标题",
    placeholder: "请输入...",
};


export const QuestionTitleDefaultProp: QuestionTitlePropsType = {
    text: "一行标题",
    level: 1,
    isCenter: false,
};
