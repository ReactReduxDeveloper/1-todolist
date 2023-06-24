import {ChangeEvent, FC, useState} from "react";

type EditableSpanType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input autoFocus onChange={changeTitle} value={title} onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>

}