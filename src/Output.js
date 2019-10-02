import React from "react";
import copy from "copy-to-clipboard";

export class Output extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "idle"
        };

        this.copy = this.copy.bind(this);
    }

    copy() {
        copy(this.props.command);

        window.setTimeout(() => {
            // leave the success message up for about a second
            this.setState({status: "idle"});
        }, 1500);

        this.setState({status: "success"});
    }

    render() {
        var text = "Copy";

        if(this.state.status == "success") {
            text = "Copied!";
        }


        return (
            <div className="section output">
                <p>
                    ALERT: Does not update automatically!
                </p>

                <textarea readOnly placeholder="/give me sign" value={this.props.command} />

                <select
                    onChange={this.props.update}
                    name="commandPrefix"
                    value={this.props.prefix}
                >
                    <option value="/give @p">/give</option>
                    <option value="/setblock ~ ~ ~">/setblock</option>
                    <option value="/data merge block ~ ~ ~">/data merge block</option>
                    <option value="">Item (No command)</option>
                </select>
                
                <button className="right" onClick={this.copy}>
                    {text}
                </button>
            </div>
        );
    }
}
