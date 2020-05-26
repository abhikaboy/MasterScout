import React, { Component } from "react";
import Table from "react-bootstrap/Table";
let match;
export class MatchRow extends Component {
  currentStyle = () => {
    if (this.props.currentMatch == match.match_number) {
      return {
        backgroundColor: "rgb(220,220,255)",
      };
    } else {
      return {};
    }
  };
  render() {
    match = this.props.match;
    return (
      <tr style={this.currentStyle()}>
        <th>{match.match_number}</th>
        <td className="primary">{match.alliances.blue.team_keys[0].slice(3)}</td>
        <td className="primary">{match.alliances.blue.team_keys[1].slice(3)}</td>
        <td className="primary">{match.alliances.blue.team_keys[2].slice(3)}</td>
        <td className="danger">{match.alliances.red.team_keys[0].slice(3)}</td>
        <td className="danger">{match.alliances.red.team_keys[1].slice(3)}</td>
        <td className="danger">{match.alliances.red.team_keys[2].slice(3)}</td>
      </tr>
    );
  }
}
const plain = {};
const selected = {
  backgroundColor: "rgb(200,200,255)",
};
export default MatchRow;
