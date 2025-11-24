import { FC, useEffect, useState } from "react"
import styles from './QuestionCheckbox.module.scss'
import { ComponentCheckbox as PropsType } from '@Cookie-repo/types'

const QuestionCheckbox: FC<PropsType> = ({ fe_id, props }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const { title, isVertical, list = [] } = props

    useEffect(() => {
        list.forEach(item => {
            const { value, checked } = item
            if (checked) {
                setSelectedValues(selectedValues => selectedValues.concat(value))
            }
        })
    }, [list])

    const toggledSelectedValues = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(v => v !== value))
        }
        else {
            setSelectedValues(selectedValues.concat(value))
        }
    }

    return (
        <>
            <p>{title}</p>
            <input type="hidden" name={fe_id} value={JSON.stringify(selectedValues)} />
            <ul className={styles.list}>
                {list.map(item => {
                    const { value, text } = item
                    let className = ''
                    if (isVertical) className = styles.verticalItem
                    else className = styles.horizontalItem

                    return (
                        <li key={value} className={className}>
                            <label>
                                <input type="checkbox"
                                    checked={selectedValues.includes(value)}
                                    onChange={() => toggledSelectedValues(value)}
                                />
                                {text}
                            </label>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default QuestionCheckbox