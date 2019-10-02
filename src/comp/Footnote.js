import React from "react";

export class Footnote extends React.Component {
    constructor(props) {
        super(props);

        this.notes = [
            "If your text is too long, it will be cut off in-game.\nBe careful.",
            "This sign isn't quite to scale, so you may find more or fewer characters actually fit on the sign when you place it in the game.",
            <span>You can colour text in survival like <a href="http://minecraft.gamepedia.com/Formatting_codes" target="_blank">this</a>!</span>,
            "Made by iNet",
            <span>Check out <a href="https://www.youtube.com/channel/UC7XCzkwZdoaZA9UmpeFSxvw" target="_blank">MC Stacker</a>!</span>,
            "Trans rights!",
            "Minecraft is a game that fell from space in 2011.",
            "Made by Notc- I MEAN aliens",
            <span>JSON is <a href="http://minecraft.gamepedia.com/Commands#Raw_JSON_text" target="_blank">very powerful</a>. This tool only covers a fraction of what is possible.</span>,
            "Variables like 'selector' and 'scoreboard' only apply when the sign is placed; they to not update live.",
            "It's gamertime!",
            "This tool uses cookies to save your progress. You probably don't care though.",
            "Not affiliated with Mojang."
        ];

        this.state = {
            note: Math.floor(Math.random() * (this.notes.length - 0))
        };

        this.rand = this.rand.bind(this);
        this.newNote = this.newNote.bind(this);
        
        this.newNote();
    }

    rand() {
        var rand = this.state.note;

        while(rand == this.state.note) {
            rand = Math.floor(Math.random() * (this.notes.length - 0));
        }

        return rand;
    }

    newNote() {
        this.setState({
            note: this.rand()
        });
    }

    render() {
        return (
            <div className="footnote">
                * {this.notes[this.state.note]}

                <div 
                    onClick={this.newNote} className="footnote-next"
                >
                    \/
                </div>
            </div>
        );
    }
}