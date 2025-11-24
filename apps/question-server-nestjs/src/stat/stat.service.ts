import { Injectable } from '@nestjs/common';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class StatService {
    constructor(
        private readonly questionService: QuestionService,
        private readonly answerService: AnswerService
    ) { }

    private _getRadioOptText(value, props: any = {}) {
        const { options = [] } = props;
        const length = options.length

        for (let i = 0; i < length; i++) {
            const item = options[i];
            if (item.value === value) {
                return item.text
            }
        }
        return ''
    }

    private _getCheckboxOptText(value, props: any = {}) {
        const { list = [] } = props
        const length = list.length

        for (let i = 0; i < length; i++) {
            const item = list[i]
            if (item.value === value) {
                return item.text
            }
        }

        return ''
    }

    private _getAnswersInfo(question, answerList = []) {
        const res: any = {}

        const { componentList = [] } = question

        answerList.forEach((a) => {
            const { componentId: componentFeId, value: v } = a
            const value: string = v

            const comp = componentList.filter((c) => c.fe_id === componentFeId)[0]
            const { type, props = {} } = comp
            if (type === 'questionRadio') {
                if (!value) return
                res[componentFeId] = this._getRadioOptText(value, props).toString()
            }
            else if (type === 'questionCheckbox') {
                if (!value) return
                const values = JSON.parse(value)
                res[componentFeId] = values
                    .map((v) => this._getCheckboxOptText(v, props))
                    .toString()
            }
            else {
                res[componentFeId] = value.toString()
            }

        })

        return res
    }

    async getQuestionStatListAndCount(
        questionId: string,
        opt: { page: number, pageSize: number },
    ) {
        const noData = { list: [], count: 0 };
        if (!questionId) return noData

        const q = await this.questionService.findOne(questionId)
        if (q == null) return noData

        const total = await this.answerService.count(questionId)
        if (total === 0) return noData

        const answers = await this.answerService.findAll(questionId, opt)

        const list = answers.map((a) => {
            return {
                _id: a._id,
                ...this._getAnswersInfo(q, a.answerList),
            }
        })

        return {
            list,
            total
        }
    }

    async getComponentStat(questionId: string, componentFeId: string) {
        if (!questionId || !componentFeId) return []

        const q = await this.questionService.findOne(questionId)
        if (q == null) return

        const { componentList = [] } = q
        const comp = componentList.filter((c) => c.fe_id === componentFeId)[0]
        if (comp == null) return [];


        const { type, props } = comp
        if (type !== 'questionRadio' && type !== 'questionCheckbox') {
            return []
        }

        const total = await this.answerService.count(questionId);
        if (total === 0) return []
        const answer = await this.answerService.findAll(questionId, {
            page: 1,
            pageSize: total,
        })

        // 计算各个 value 数量
        const countInfo = {}
        answer.forEach((a) => {
            const { answerList = [] } = a
            answerList.forEach((ans) => {
                if (ans.componentId !== componentFeId) return;

                let values: string[] = []
                try {
                    const parsed = JSON.parse(ans.value)
                    if (Array.isArray(parsed)) {
                        values = parsed
                    } else {
                        values = [parsed]
                    }
                } catch (e) {
                    values = [ans.value]
                }
                values.forEach((v) => {
                    if (countInfo[v] == null) countInfo[v] = 0
                    countInfo[v]++
                })
            })
        })

        const list: any = []
        for (const val in countInfo) {
            let text = ''
            if (type === 'questionRadio') {
                text = this._getRadioOptText(val, props);
            }
            else if (type === 'questionCheckbox') {
                text = this._getCheckboxOptText(val, props);
            }

            list.push({ name: text, count: countInfo[val] })
        }

        return list
    }
}
