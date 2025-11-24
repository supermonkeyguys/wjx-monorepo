import { post } from "./ajax"

export async function postAnswer(answerInfo: any) {
    const url = '/api/answer'
    console.log(answerInfo)
    const data = await post(url,answerInfo)

    return data
}
