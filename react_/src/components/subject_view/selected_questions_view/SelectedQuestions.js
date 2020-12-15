import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import SelectedQuestion from "./SelectedQuestion";
import "./SelectedQuestions.css";
export default class SelectedQuestions extends Component {
  state = {
    selectedQuestions: [],
    qsOfType: [],
  };
  componentDidMount = () => {
    const { pattern, questions, institute, df_level, onHide } = this.props;
    // const {qsOfType} = this.state
    let mark_question = [];
    if (pattern.noq > questions.length) {
      window.alert("Not enough number of questions in the database.");
      onHide();
    }
    console.log(pattern, questions, institute, df_level);
    // assmebling marks & queston in a array
    let a = pattern.mark_array.split("Z");
    let b = pattern.question_array.split("Z");
    for (let i = 0; i < a.length; i++) {
      mark_question[i] = [a[i], b[i]];
    }
    console.log(mark_question);
    let f = false;
    var lst = [];
    for (var i = 0; i < a.length; i++) {
      // console.log(mark_question[i][0]);
      var aa = [
        ...questions.filter(
          (question) => question.mark.toString() === mark_question[i][0]
        ),
      ];
      console.log(aa);
      if (aa.length >= mark_question[i][1]) {
        lst.push(aa);
        // this.setState(((state)=> ({
        //   qsOfType : [...state.qsOfType, aa]
        // })))
        console.log("OK", aa);
      } else {
        const msg = `Not sufficient question in database for ${mark_question[i][0]} mark. Please add Some .`;
        window.alert(msg);
        // console.log("ERRR", i);
        onHide();
        break;
      }
    }
    console.log('lst',lst)
    let lst_selected = [];
    // lst = lst.sort(() => 0.5 - Math.random());
    for (var i = 0; i < lst.length; i++) {
      let lst1 = [];
      for (var j = 0; j < lst[i].length; j++) {
        if (lst[i][j].difficult_level === df_level) {
          lst1.push(lst[i][j]);
        }
      }
      console.log("lst1 --easy", lst1, mark_question[i][1]);
      if (lst1.length >= mark_question[i][1]) {
        const shuffled = lst1.sort(() => 0.5 - Math.random());
        lst_selected.push(shuffled.slice(0, mark_question[i][1]));
        console.log('if statement',shuffled.slice(0, mark_question[i][1]));
      } else {
        var k = mark_question[i][1] - lst1.length;
        var j = 0;
        var l = 0;
        while (j < lst[i].length && l < k) {
          if (lst[i][j].difficult_level !== df_level) {
            lst1.push(lst[i][j]);
            l++;
          }
          j++;
        }
        const shuffled = lst1.sort(() => 0.5 - Math.random());
        console.log('else statement',shuffled.slice(0, lst[i].length), )
        lst_selected.push(shuffled.slice(0, lst[i].length));
      }
    }
    console.log(lst_selected);
    this.setState({ selectedQuestions: lst_selected });
  };
  // displayQuestions = () => {
  //   const {selectedQuestions} = this.state
  //   for (var i=0; i< selectedQuestions.length ; i++) {
  //     selectedQuestions[i].map((question, idx)=> ({
  //       <SelectedQuestion key={idx} question={question} />
  //     }))
  //   }
  // }
  render() {
    return (
      <div>
        <Modal
          size="lg"
          show={true}
          aria-labelledby="example-modal-sizes-title-lg"
          style={{ backgroundColor: "#625D52" }}
        >
          <Modal.Header>
            <Modal.Title
              style={{ color: "red" }}
              id="example-modal-sizes-title-lg"
            >
              Selected Questions
            </Modal.Title>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Header>
          <Modal.Body>
            <center>
              <h3>Institute Name: {this.props.institute.name1}</h3>
              <h6>
                Address : {this.props.institute.address},{" "}
                {this.props.institute.state}, {this.props.institute.city},{" "}
                {this.props.institute.country}
              </h6>
              {this.state.selectedQuestions.map((questions, idx) => (
                <div key={idx} className="section">
                  <h3 className="section_name">Section {idx + 1}</h3>
                  <hr className="section_hr" />
                  {questions.map((question, i) => (
                    <SelectedQuestion key={i} index={i} question={question} />
                  ))}
                </div>
              ))}
            </center>
            {console.log(this.state.selectedQuestions)}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
