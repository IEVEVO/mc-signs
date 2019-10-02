import React from "react";
import { SpecialRow } from "./comp/SpecialRow";


export class Codes extends React.Component {
    render() {
        return (
            <div className="subpage">
                <h1>Colour Codes</h1>

                <p>
                    These are some colour codes that you can use to re-create your sign in survival Minecraft.
                    <br /><br />
                    <code>§</code> can be made by holding <code>ALT</code> and typing <code>2</code>, <code>1</code> on your numpad.
                </p>

                <table>
                    <tr className="header"><th>Colours</th></tr>

                    <SpecialRow code="§0" text="Black" />
                    <SpecialRow code="§1" text="Dark blue" />
                    <SpecialRow code="§2" text="Dark green" />
                    <SpecialRow code="§3" text="Dark aqua" />
                    <SpecialRow code="§4" text="Dark red" />
                    <SpecialRow code="§5" text="Dark purple" />
                    <SpecialRow code="§6" text="Gold" />
                    <SpecialRow code="§7" text="Gray" />
                    <SpecialRow code="§8" text="Dark gray" />
                    <SpecialRow code="§9" text="Blue" />
                    <SpecialRow code="§a" text="Green" />
                    <SpecialRow code="§b" text="Aqua" />
                    <SpecialRow code="§c" text="Red" />
                    <SpecialRow code="§d" text="Light purple" />
                    <SpecialRow code="§e" text="Yellow" />
                    <SpecialRow code="§f" text="White" />
                </table>

                <table>
                    <tr className="header"><th>Formatting</th></tr>
                    
                    <SpecialRow code="§k" text="Obfuscated" />
                    <SpecialRow code="§l" text="Bold" />
                    <SpecialRow code="§m" text="Strikethrough" />
                    <SpecialRow code="§n" text="Underline" />
                    <SpecialRow code="§o" text="Italic" />
                    <SpecialRow code="§r" text="Reset" />
                </table>

                <button name="main" onClick={this.props.navigate}>
                    Back
                </button>
            </div>
        );
    }
}
