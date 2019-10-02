import React from "react";

export class LineSection extends React.Component {
    constructor(props) {
        super(props);

        this.colours = {
            white: "#fff",
            black: "#000",
            "dark_gray": "#555",
            "dark_blue": "#00a",
            "dark_green": "#0a0",
            "dark_aqua": "#0aa",
            "dark_red": "#a00",
            "dark_purple": "#a0a",
            "light_purple": "#f5f",
            gold: "#fa0",
            gray: "#aaa",
            blue: "#55f",
            green: "#5f5",
            aqua: "#5ff",
            red: "#f55",
            yellow: "#ff5"
        };

        this.edit = this.edit.bind(this);
    }

    edit() {
        this.props.edit(this.props.index);
    }

    render() {
        // special text
        var text = "";

        if(this.props.data.type == "text") {
            text = this.props.value;
        }
        else if(this.props.data.type == "score") {
            text = this.props.data.score;
        }
        else if(this.props.data.type == "selector") {
            text = this.props.data.selector;
        }
        else if(this.props.data.type == "keybind") {
            text = "KEY";
        }
        

        // styles
        var def = "black";

            // colour
        if(this.props.data.color == "default") {
            // default color is grey for dark oak
            if(this.props.material == 4) {
                // dark oak
                def = "gray";
            }
            else {
                def = "black";
            }
        }
        else {
            def = this.colours[this.props.data.color];
        }


        var styles = {
            color: def,
            fontWeight: this.props.data.bold ? "bold" : "",
            fontStyle: this.props.data.italic ? "italic" : ""
        },
            deco = "";

        // strikethrough
        if(this.props.data.underline) {
            deco += "underline";
        }
        if(this.props.data.strikethrough) {
            deco += " line-through";
        }

        styles.textDecoration = deco;

        // obfuscated
        if(this.props.data.obfuscated) {
            var tmp = "";

            for(var i = 0; i < this.props.value.length; i++) {
                tmp += "*";
            }

            text = tmp;
        }

        // focused
        var classes = "";
        
        if(this.props.data.focus) {
            classes += "focus";
        }


        return (
            <span onClick={this.edit} className={classes} style={styles}>
                {text}
            </span>
        );
    }
}