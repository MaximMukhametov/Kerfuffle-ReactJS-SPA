import {maxLengthCreator} from "../../../utils/validators/validators";
import {fieldCreator, Textarea} from "../FormsControls/FormsControls";
import React from "react";

const maxLength10 = maxLengthCreator(300);

const MyPostsForm = (props) => {

    // всё что передаётся в тэг Field в качестве параметров,
    // уходит в компоненту component={Textarea} ,
    // туда некоторые параметры попадают в полё input(такие как name, value  и т.д.),
    // так же туда попадают параметры Meta, и все остальные парааметры просто передаются
    // как обычные пропсы(например placeholder и lalalala={'lalalala'})
    return (
        <form onSubmit={props.handleSubmit}>
            {fieldCreator("post", "text", Textarea, {
                validate: [maxLength10],
                placeholder: "New Post"
            })}
            <button>Send</button>
        </form>
    )
};

export default MyPostsForm

