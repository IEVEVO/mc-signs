import React from "react";
import { Editor } from "./comp/Editor";
import { SignBase } from "./comp/SignBase";
import { Footnote } from "./comp/Footnote";
import { Output } from "./Output";

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 


export class Page extends React.Component {
    constructor(props) {
        super(props);

        // materials as they appear to the user
        this.materials = ["Oak", "Birch", "Spruce", "Jungle", "Dark Oak", "Acacia"];

        // materials for the command
        this.materials_cmd = ["oak", "birch", "spruce", "jungle", "dark_oak", "acacia"];


        this.state = {
            isEditing: false,
            commandOpen: false,
            command: "",
            commandPrefix: "/give @p",
            edit_line: 1,
            edit_section: 0,
            material: 0,
            line_1: [],
            line_2: [
                {
                    type: "text",
                    text: "Welcome!",
                    score: "",
                    selector: "@p",
                    keybind: "key.inventory",
                    color: "default",
                    bold: false,
                    italic: false,
                    underline: false,
                    strikethrough: false,
                    obfuscated: false
                }
            ],
            line_3: [],
            line_4: []
        };

        this.save = this.save.bind(this);

        this.updateState = this.updateState.bind(this);
        this.update = this.update.bind(this);
        this.addSection = this.addSection.bind(this);
        this.deleteSection = this.deleteSection.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
        this.openEditor = this.openEditor.bind(this);

        this.nextMaterial = this.nextMaterial.bind(this);

        this.toggleCommand = this.toggleCommand.bind(this);
        this.generate = this.generate.bind(this);
        this.reset = this.reset.bind(this);
    }

    save() {
        window.localStorage.setItem("data", JSON.stringify(this.state));
    }


    componentWillUnmount() {
        // back up state when unloaded
        this.save();
    }

    componentDidUpdate(prevProps, prevState) {
        // save on change
        this.save();

        // re-generate command
        if(this.state.commandOpen) {
            if(prevState == this.state) {
                this.generate();
            }
        }
    }

    componentDidMount() {
        // load state
        var state = window.localStorage.getItem("data");
        
        if(state != undefined) {
            this.setState(
                JSON.parse(state)
            );
        }
        else {
            //this.reset();
        }
    }


    updateState(e) {
        var tmp = this.state;

        tmp[e.target.name] = e.target.value;

        this.setState(tmp);
    }

    update(key, value) {
        var tmp = this.state["line_" + this.state.edit_line], 
            tmp2 = {};

        tmp[this.state.edit_section][key] = value;

        tmp2["line_" + this.state.edit_line] = tmp;
        this.setState(tmp2);
    }

    addSection(line) {
        var tmp = this.state["line_" + line], 
            tmp2 = {};

        
        // check the last section isn't empty
        var lastSection = this.state["line_" + line][this.state["line_" + line].length - 1];

        if(lastSection != undefined && 
            ((lastSection.type == "text" && lastSection.text == "") ||
            (lastSection.type == "score" && lastSection.score == ""))
        ) { 
            // if the text/objective name is blank
            confirmAlert({
                title: "Error",
                message: "Fill in the previous section before adding another one.",
                buttons: [
                    {
                        label: "Okay",
                        onClick: () => {return false;}
                    }
                ]
            });
        }
        else {
            // if it's not blank, or there are no sections
            tmp.push({
                type: "text",
                text: "",
                score: "",
                selector: "@p",
                keybind: "key.inventory",
                color: "default",
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
                obfuscated: false
            });
        }


        tmp2["line_" + line] = tmp;
        this.openEditor(line, this.state["line_" + line].length - 1);
        this.setState(tmp2);
    }

    deleteSection() {
        var tmp = this.state["line_" + this.state.edit_line], tmp2 = {};

        tmp.splice(this.state.edit_section, 1);

        tmp2["line_" + this.state.edit_line] = tmp;

        // check there's something to switch to,
        // else just close the window
        if(this.state.edit_section == 0) {
            tmp2.isEditing = false;
        }
        else {
            tmp2.edit_section = this.state.edit_section - 1;
        }


        this.setState(tmp2);
    }


    nextMaterial() {
        var cur = this.state.material,
            next = 0;

        if(cur != this.materials.length - 1) {
            next = cur + 1;
        }

        this.setState({material: next});
    }


    closeEditor() {
        this.setState({isEditing: false});
    }

    openEditor(line, index) {
        this.setState({
            isEditing: true,
            edit_line: line,
            edit_section: index
        });
    }

    toggleCommand() {
        this.generate();

        this.setState({
            commandOpen: !this.state.commandOpen
        });
    }


    reset() {
        // ask first
        //if( confirm("Clear everything and reset?") ) {
        const reset = () => {
            this.setState({
                isEditing: false,
                material: 0,
                commandOpen: false,
                command: "",
                line_1: [],
                line_2: [
                    {
                        type: "text",
                        text: "Welcome!",
                        score: "",
                        selector: "@p",
                        keybind: "key.inventory",
                        color: "default",
                        bold: false,
                        italic: false,
                        underline: false,
                        strikethrough: false,
                        obfuscated: false
                    }
                ],
                line_3: [],
                line_4: []
            });
        };


        // execute
        confirmAlert({
            title: "Confirm reset",
            message: "Clear everything and reset?",
            buttons: [
                {
                    label: "Cancel",
                    onClick: () => {return false;}
                },
                {
                    label: "Reset",
                    onClick: reset
                }
            ]
        });
    }

    generate() {
        // generates and sends to toggleCommand()
        var json = {};

        for(var i = 1; i <= 4; i++) {
            var line = this.state["line_" + i],
                tmp = [];

            for(var x = 0; x < line.length; x++) {
                var section = line[x],
                    newObj = {};

                // for each section of each line
                if(section.type == "text") {
                    // text section
                    if(section.text != "") {
                        newObj.text = section.text;
                    }
                    else {
                        continue;
                    }
                }
                else if(section.type == "score") {
                    // scoreboard objective section
                    if(section.score != "") {
                        newObj.score = {objective: section.score};
                    }
                    else {
                        continue;
                    }
                }
                else if(section.type == "selector") {
                    // player selector section
                    newObj.selector = section.selector;
                }
                else if(section.type == "keybind") {
                    // keybind section
                    newObj.keybind = section.keybind;
                }


                if(section.color != "default") {
                    newObj.color = section.color;
                }
                
                // a && b is an if() statement
                // I am just lazy
                (section.bold) && (newObj.bold = true);
                (section.italic) && (newObj.italic = true);
                (section.underline) && (newObj.underlined = true);
                (section.strikethrough) && (newObj.strikethrough = true);
                (section.obfuscated) && (newObj.obfuscated = true);

                tmp.push(newObj);
            }


            json["Text" + i] = tmp;
        }


        // assemble
        var cmd = this.state.commandPrefix;

        if(cmd != "/data merge block ~ ~ ~") {
            cmd += " minecraft:" + this.materials_cmd[this.state.material] + "_sign";
        }
        else {
            cmd += " ";
        }

        cmd += "{BlockEntityTag:" + JSON.stringify(json) + "} 1";

        this.setState({
            command: cmd
        });
    }


    render() {
        var isEditing = "",
            sections = [
                this.state.line_1, 
                this.state.line_2, 
                this.state.line_3, 
                this.state.line_4
            ];
        
        // pick active one
        for(var i = 1; i <= 4; i++) {
            var line = this.state["line_" + i];

            for(var x = 0; x < line.length; x++) {
                if(i == this.state.edit_line && x == this.state.edit_section && this.state.isEditing) {
                    line[x].focus = true;
                }
                else {
                    line[x].focus = false;
                }
            }
        }


        // show editor
        if(this.state.isEditing) {
            var tmp = this.state,
                data = {};

            data = tmp["line_" + tmp.edit_line][tmp.edit_section];

            isEditing = (
                <Editor 
                    close={this.closeEditor}
                    update={this.update} 
                    delete={this.deleteSection}
                    changeType={this.changeType}
                    data={data}
                />
            );
        }

        // show command box
        var cmd = "", 
            materials = "",
            cmdTitle = "Generate command";

        if(this.state.commandOpen) {
            cmd = (
                <Output 
                    command={this.state.command} 
                    generate={this.generate} 
                    update={this.updateState}
                    prefix={this.state.commandPrefix}
                />
            );

            cmdTitle = "Edit sign";
        }
        else {
            cmd = (
                <SignBase 
                    add={this.addSection}
                    edit={this.openEditor} 
                    sections={sections} 
                    material={this.state.material}
                    next={this.nextMaterial}
                />
            );

            materials = (
                <div 
                    className="section material" 
                    onClick={this.nextMaterial}
                >
                    {this.materials[this.state.material]} Sign
                </div>
            );
        }


        return (
            <div>
                {isEditing}


                <div className="section actionbar">
                    <button name="codes" onClick={this.props.navigate}>
                        Codes
                    </button>
                    <button className="danger" onClick={this.reset}>
                        Reset
                    </button>
                    <button className="active" onClick={this.toggleCommand}>
                        {cmdTitle}
                    </button>
                </div>

                {cmd}

                {materials}

                <Footnote />
            </div>
        );
    }
}
