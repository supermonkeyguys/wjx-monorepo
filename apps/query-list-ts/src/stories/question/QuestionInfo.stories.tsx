import { type Meta, type StoryObj } from '@storybook/react'

import Component from '../../components/QuestionComponent/QuestionInfo/Component'

const meta:Meta<typeof Component> = {
    title:'Question/QuestionInfo',
    component: Component
}

export default meta

type Story = StoryObj<typeof Component>

export const Default: Story = {
    args: {
        title: '问卷标题',
        description: '默认\n描述',
    }
}

export const CustomInfo: Story = {
    args: {
        title: '自定义标题',
        description: '自定义\n描述'
    }
}