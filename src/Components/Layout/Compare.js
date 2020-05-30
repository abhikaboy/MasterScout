import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Line } from "react-chartjs-2";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import { RawDataTable } from "./ManageDataTabs/RawDataTable";
import { AnalyzedTable } from "./ManageDataTabs/AnalyzedTable";
import { clearTeams } from "../../Actions/CompareActions/clearTeams";
import { removeTeam } from "../../Actions/CompareActions/removeTeam";
import { selectTeam } from "../../Actions/CompareActions/selectTeam";
import { connect } from "react-redux";

export class CompareRaw extends Component {
  submitHandle = (e) => {
    e.preventDefault();
    this.props.selectTeam(this._input.value);
    this._input.value = "";
  };
  clearTeams = (e) => {
    this.props.clearTeams();
  };
  removeTeam = (num) => {
    this.props.removeTeam(num);
  };
  render() {
    let selectedTeams = [];
    for (const teamNum of this.props.compare.selectedTeams) {
      selectedTeams.push(
        this.props.data.teams.find((team) => team.teamNumber == teamNum)
      );
    }
    console.log(selectedTeams);
    return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
        <Container>
          <Row className="border-bottom">
            <Col>
              <h2 style={homeHeader}>Compare</h2>
            </Col>
          </Row>
          <Row style={spacer}>
            <Form inline style={formWidth} onSubmit={this.submitHandle}>
              <FormGroup as={Row} style={formWidth}>
                <Form.Label column>Team:</Form.Label>
                <Col sm="10">
                  <FormControl
                    type="text"
                    className="mr-sm-2"
                    placeholder=""
                    ref={(el) => {
                      this._input = el;
                    }}
                    style={inputWidth}
                  />
                </Col>
                <Col>
                  <Button onClick={this.clearTeams}>Clear</Button>
                </Col>
              </FormGroup>
            </Form>
          </Row>
          <Row style={spacer}>
            {this.props.compare.selectedTeams.map((teamnum) => (
              <div>
                <Button
                  variant="danger"
                  style={spacer}
                  onClick={this.removeTeam}
                >
                  - {teamnum}
                </Button>
              </div>
            ))}
          </Row>
          {selectedTeams.map((team) => {
            return <RawDataTable team={team} style={formWidth} />;
          })}
          <AnalyzedTable
            teams={selectedTeams}
            highlight={true}
            stripes={false}
          />
        </Container>
      </div>
    );
  }
}
const floatRight = {
  float: "right",
  padding: "1vh",
};
const formWidth = {
  width: "100%",
};
const inputWidth = {
  width: "100%",
};
const homeHeader = {
  marginBottom: "2%",
};
const spacer = {
  padding: "1vh",
};
const mapStateToProps = (state) => {
  return {
    compare: state.compare,
    data: state.dataReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  // propName: (parameters) => dispatch(action)
  return {
    selectTeam: (num) => dispatch(selectTeam(num)),
    removeTeam: (num) => dispatch(removeTeam(num)),
    clearTeams: () => dispatch(clearTeams()),
  };
};
export const Compare = connect(mapStateToProps, mapDispatchToProps)(CompareRaw);
