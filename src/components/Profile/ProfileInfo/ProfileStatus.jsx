import React from "react";

class ProfileStatus extends React.Component {

    state = {
        status: this.props.status,
        editMode: false
    };


    // если обьявить функцию обычным способом ( activateEditMode () {....} ) то теряется контекст(this), и прийдётся делать bind
    // поэтому нужно использовать стрелочную функцию, т.к. она не теряет контекст

    activateEditMode = () => {
        // setState метод из роительского класса React.Component, и он асинхронен, поэтому выполняется какое-то время
        this.setState({
            editMode: !this.state.editMode,
        });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.state.status = this.props.status
        }
    }

    render() {

        return (
            <div>
                <div>{this.props.state}</div>
                {!this.state.editMode &&
                <div>
                    <span onClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.activateEditMode}
                           value={this.state.status}/>
                </div>
                }
            </div>)

    }
}

export default ProfileStatus