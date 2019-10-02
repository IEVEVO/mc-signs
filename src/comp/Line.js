import React from "react";
import {LineSection} from "./LineSection";

export class Line extends React.Component {
    constructor(props) {
        super(props);

        this.addSection = this.addSection.bind(this);
        this.editSection = this.editSection.bind(this);
    }

    addSection() {
        this.props.add(this.props.line);
    }

    editSection(index) {
        this.props.edit(this.props.line, index);
    }

    render() {
        var sections = [];

        // generate sections
        for(var i = 0; i < this.props.sections.length; i++) {
            sections.push(
                <LineSection 
                    value={this.props.sections[i].text} 
                    edit={this.editSection}
                    update={this.update}
                    data={this.props.sections[i]}
                    material={this.props.material}
                    index={i}
                    key={i}
                />
            );
        }


        return (
            <div className="sign-line">
                {sections}

                <button 
                    className="add-section"
                    onClick={this.addSection}
                >
                    +
                </button>
            </div>
        );
    }
}