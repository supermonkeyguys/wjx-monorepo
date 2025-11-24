// 定义组件特定的属性 (B端和C端通用)
export type OptionType = {
    value: string;
    text: string;
    checked: boolean;
};

export type QuestionCheckboxPropsType = {
    title?: string;
    isVertical?: boolean;
    list?: OptionType[];
};

export type QuestionInfoPropsType = {
    title?: string;
    description?: string;
};

export type QuestionInputPropsType = {
    title?: string;
    placeholder?: string;
};

export type QuestionParagraphPropsType = {
    text?: string;
    isCenter?: boolean;
};

export type RadioOptionType = {
    value: string;
    text: string;
};

export type QuestionRadioPropsType = {
    title?: string;
    isVertical?: boolean;
    options?: RadioOptionType[];
    value?: string;
};

export type QuestionTextareaPropsType = {
    title?: string;
    placeholder?: string;
};

export type QuestionTitlePropsType = {
    text?: string;
    level?: 1 | 2 | 3 | 4 | 5;
    isCenter?: boolean;
};

export interface ComponentCheckbox {
    fe_id: string;
    props: QuestionCheckboxPropsType;
}

export interface QuestionInput {
    fe_id: string;
    props: QuestionInputPropsType;
}

export interface QuestionRadio {
    fe_id: string
    props: QuestionRadioPropsType
}

export interface QuestionTextarea {
    fe_id: string
    props: QuestionTextareaPropsType
}