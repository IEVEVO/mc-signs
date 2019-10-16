import React from "react";

export class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.update = this.update.bind(this);
        this.updateButtons = this.updateButtons.bind(this);
        this.changeType = this.changeType.bind(this);
    }

    update(e) {
        var val = e.target.value || false;

        this.props.update(e.target.name, val);
    }

    updateButtons(e) {
        var name = e.target.name || e.target.parentNode.name,
            val = this.props.data[name];

        console.log(val);
        console.log(name);

        if(val == "true" || val) {
            val = false;
        }
        else if(val == "false" || !val) {
            val = true;
        }
        else {
            window.alert("aaaaaaaaaaaaaa");
        }

        this.props.update(name, val);
    }

    changeType(e) {
        this.props.update("type", e.target.value);
    }


    render() {
        var options = {
            text: (
                <div className="option">
                    <label>Text to display</label>

                    <input 
                        type="text" 
                        name="text"
                        value={this.props.data.text || ""} 
                        onChange={this.update}
                        maxLength="40"
                    />
                </div>
            ),
            translate: (
                <div className="section">
                    <label>Text to display</label>

                    <input 
                        type="text" 
                        name="text"
                        value={this.props.data.text || ""} 
                        onChange={this.update}
                    />
                </div>
            ),
            score: (
                <div className="option">
                    <label>Objective name</label>
                    
                    <input 
                        type="text" 
                        name="score"
                        value={this.props.data.score || ""}
                        onChange={this.update}
                    />
                </div>
            ),
            selector: (
                <div className="option">
                    <label>Select</label>

                    <select
                        name="selector"
                        value={this.props.data.selector || "@p"}
                        onChange={this.update}
                    >
                        <option value="@p">Nearest player</option>
                        <option value="@r">Random player</option>
                        <option value="@a">All players</option>
                        <option value="@e">All entities</option>
                        <option value="@s">Self</option>
                    </select>
                </div>
            ),
            keybind: (
                <div className="option">
                    <label>Key</label>

                    <select
                        name="keybind"
                        value={this.props.data.keybind}
                        onChange={this.update}
                    >
                        <option value="key.inventory">Inventory (E)</option>
                        <option value="key.jump">Jump (SPACEBAR)</option>
                        <option value="key.drop">Drop item (Q)</option>
                        <option value="key.swapHands">Swap hands (F)</option>
                        <option value="key.chat">Open chat (T)</option>
                        <option value="key.sneak">Sneak (L-SHIFT)</option>
                        <option value="key.playerlist">Open player list (TAB)</option>
                        <option value="key.attack">Attack (LMB)</option>
                        <option value="key.use">Use (RMB)</option>
                        <option value="key.pickItem">Pick block (MMB)</option>
                    </select>
                </div>
            )
        };
        
        var mods = {
            bold:  this.props.data.bold || false ? "true" : "false",
            italic:  this.props.data.italic || false ? "true" : "false",
            underline:  this.props.data.underline || false ? "true" : "false",
            strikethrough:  this.props.data.strikethrough || false ? "true" : "false",
            obfuscated:  this.props.data.obfuscated || false ? "true" : "false"
        };
        

        return (
            <div className="editor">
                <label>Section type</label>

                <select 
                    onChange={this.changeType} 
                    name="type"
                    value={this.props.data.type}
                >
                    <option value="text">Text</option>
                    <option value="score">Scoreboard</option>
                    <option value="selector">Selector</option>
                    <option value="keybind">Keybind</option>
                </select>

                {options[this.props.data.type]}

                <div className="option boxes">
                    <button 
                        onClick={this.updateButtons}
                        name="bold"
                        className={mods.bold}
                        data-value={this.props.data.bold}
                    >
                        <b>B</b>
                    </button>
                    <button 
                        onClick={this.updateButtons}
                        name="italic"
                        className={mods.italic}
                        data-value={this.props.data.italic}
                    >
                        <i>I</i>
                    </button>
                    <button 
                        onClick={this.updateButtons}
                        name="underline"
                        className={mods.underline}
                        data-value={this.props.data.underline}
                    >
                        <u>U</u>
                    </button>
                    <button 
                        onClick={this.updateButtons}
                        name="strikethrough"
                        className={mods.strikethrough}
                        data-value={this.props.data.strikethrough}
                    >
                        <strike>S</strike>
                    </button>
                    <button 
                        onClick={this.updateButtons}
                        name="obfuscated"
                        className={mods.obfuscated}
                        value={this.props.data.obfuscated}
                    >
                        *
                    </button>
                </div>

                <div className="option">
                    <label>Text colour</label>

                    <select
                        name="color"
                        value={this.props.data.color || "white"}
                        onChange={this.update}
                    >
                        <option value="default">[Default]</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="gray">Gray</option>
                        <option value="dark_gray">Dark gray</option>
                        <option value="red">Red</option>
                        <option value="dark_red">Dark red</option>
                        <option value="blue">Blue</option>
                        <option value="dark_blue">Dark blue</option>
                        <option value="green">Green</option>
                        <option value="dark_green">Dark green</option>
                        <option value="aqua">Aqua</option>
                        <option value="dark_aqua">Dark aqua</option>
                        <option value="light_purple">Purple</option>
                        <option value="dark_purple">Dark purple</option>
                        <option value="yellow">Yellow</option>
                        <option value="gold">Gold</option>
                    </select>
                </div>

                <div className="icons">
                    <button className="danger" onClick={this.props.delete}>
                        Delete
                    </button>
                    <button onClick={this.props.close}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}