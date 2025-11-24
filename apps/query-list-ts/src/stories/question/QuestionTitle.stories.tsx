
import type { Meta, StoryObj } from '@storybook/react-vite'
import Component from '../../components/QuestionComponent/QuestionTitle/Component'

const meta: Meta<typeof Component> = {
    title: 'Question/QuestionTitle',
    component: Component
}

export default meta

type Story = StoryObj<typeof Component>

export const Default: Story = {
    args: {
        text: '问卷标题',
        level: 1,
        isCenter: false
    }
}


export const CustomTitle: Story = {
    args: {
        text: '自定义标题',
        level: 2,
        isCenter: true
    }
}