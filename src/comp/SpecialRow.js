import React from "react";
import copy from "copy-to-clipboard";

export class SpecialRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            state: "idle"
        };

        this.copy = this.copy.bind(this);
        this.reset = this.reset.bind(this);
    }

    copy() {
        copy(this.props.code);

        this.setState({status: "success"});
    }

    reset() {
        this.setState({status: "idle"});
    }

    render() {
        var color = "right small";

        if(this.state.status == "success") {
            color += " active";
        }


        return (
            <tr>
                <td>
                    <code>{this.props.code}</code>{" "}
                    {this.props.text}

                    <button 
                        className={color} 
                        onClick={this.copy}
                        onMouseOver={this.reset}
                    >
                        Copy
                    </button>
                </td>
            </tr>
        );
    }
}
