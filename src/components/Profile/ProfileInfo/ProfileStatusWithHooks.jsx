import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
    let [status, setStatus] = useState(props.status);
    let [editMod, setEditMod] = useState(false);

    // в одно строку это записывается так, но ниже развёрнутый вариант
    // let stateWithSetState = useState(true); // создаёт масив, useState это хук для создания/работы с локальным стейтом
    // let editMod = stateWithSetState[0]; // первым элементом массива является значение которое мы передали в функцию useState (initialState:false)
    // let setEditMod = stateWithSetState[1]; // вторым элементом лежит функция которая устанавливает/меняет это значение

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        // setState метод из роительского класса React.Component, и он асинхронен, поэтому выполняется какое-то время
        setEditMod(!editMod);
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    };
    return (
        <div>
            {!editMod &&
            <div>
                <span onClick={activateEditMode}>{props.status || "...loading status"}</span>
            </div>
            }

            {editMod &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={activateEditMode}
                       value={status}/>
            </div>
            }
        </div>
    )

};


export default ProfileStatusWithHooks