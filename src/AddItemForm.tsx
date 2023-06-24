import React, {ChangeEvent, FC, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormType> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle("")

        } else {
            setError("title is required!")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === "Enter") {
            addItem();
        } else {
            setError("title is required!")
        }
    };

    return <div>
        <TextField
            variant='outlined'
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            error={!!error}
            label='Title'
            helperText={error}
        />

        <IconButton color='primary'
                    onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
}