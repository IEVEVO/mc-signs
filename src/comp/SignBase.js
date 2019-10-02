import React from "react";
import { Line } from "./Line";

export class SignBase extends React.Component {
    constructor(props) {
        super(props);

        this.materials_names = ["oak", "birch", "spruce", "jungle", "dark_oak", "acacia"];

        this.materials = [
            "https://i.imgur.com/az30vN7.png",
            "https://i.imgur.com/cMKwGy9.png",
            "https://i.imgur.com/krNPPdR.png",
            "https://i.imgur.com/538ilQK.png",
            "https://i.imgur.com/oGcOiPm.png",
            "https://i.imgur.com/ePGYJto.png"
        ];


        this.state = {
            material: 0
        };

        this.changeMaterial = this.changeMaterial.bind(this);
        this.next = this.next.bind(this);
    }

    changeMaterial(index) {
        this.setState({material: index});
    }

    next() {
        var cur = this.state.material,
            next = 0;

        if(cur != this.materials.length - 1) {
            next = cur + 1;
        }

        this.setState({material: next});
    }

    render() {
        var bg = {backgroundImage: "url('" + this.materials[this.props.material] + "')"};

        return (
            <div 
                className="section sign-base" 
                onDoubleClick={this.next}
                style={bg}
            >
                <Line 
                    sections={this.props.sections[0]} 
                    line="1"
                    update={this.updateLine}
                    edit={this.props.edit}
                    add={this.props.add}
                    material={this.props.material}
                />

                <Line 
                    sections={this.props.sections[1]} 
                    line="2"
                    update={this.updateLine}
                    edit={this.props.edit}
                    add={this.props.add}
                    material={this.props.material}
                />

                <Line 
                    sections={this.props.sections[2]} 
                    line="3"
                    update={this.updateLine}
                    edit={this.props.edit}
                    add={this.props.add}
                    material={this.props.material}
                />

                <Line 
                    sections={this.props.sections[3]} 
                    line="4"
                    update={this.updateLine}
                    edit={this.props.edit}
                    add={this.props.add}
                    material={this.props.material}
                />
            </div>
        );
    }
}