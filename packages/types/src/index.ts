// 定义组件特定的属性 (B端和C端通用)
export interface QuestionInputProps {
    title?: string;
    placeholder?: string;
}

// 2. 定义通用的组件数据模型 (三端通用)
// 所有的组件在数据库里大概长这样
export interface ComponentInfo {
    fe_id: string; // 前端生成的 ID
    type: string;  // 组件类型，如 'questionInput'
    isHidden?: boolean;
    isLocked?: boolean;
    props: QuestionInputProps; // 这里引用上面的定义
}