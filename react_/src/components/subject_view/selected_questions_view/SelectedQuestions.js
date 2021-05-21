import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import SelectedQuestion from "./SelectedQuestion";
import jsPDF from "jspdf";
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
    // assmebling marks & queston in a array
    let a = pattern.mark_array.split("Z");
    let b = pattern.question_array.split("Z");
    for (let i = 0; i < a.length; i++) {
      mark_question[i] = [a[i], b[i]];
    }
    let f = false;
    var lst = [];
    for (var i = 0; i < a.length; i++) {
      var aa = [
        ...questions.filter(
          (question) => question.mark.toString() === mark_question[i][0]
        ),
      ];
      if (aa.length >= mark_question[i][1]) {
        lst.push(aa);
      } else {
        const msg = `Not sufficient question in database for ${mark_question[i][0]} mark. Please add Some .`;
        window.alert(msg);
        onHide();
        break;
      }
    }
    let lst_selected = [];
    // lst = lst.sort(() => 0.5 - Math.random());
    for (var i = 0; i < lst.length; i++) {
      let lst1 = [];
      for (var j = 0; j < lst[i].length; j++) {
        if (lst[i][j].difficult_level === df_level) {
          lst1.push(lst[i][j]);
        }
      }
      if (lst1.length >= mark_question[i][1]) {
        const shuffled = lst1.sort(() => 0.5 - Math.random());
        lst_selected.push(shuffled.slice(0, mark_question[i][1]));
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
        lst_selected.push(shuffled.slice(0, lst[i].length));
      }
    }
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
  generatePDF = () => {
    var doc = jsPDF();
    const { selectedQuestions } = this.state;
    let line = 20;

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageRatio = pageWidth / pageHeight;
    doc.setTextColor("red");
    doc.setFontSize(25);
    doc.text(23, line, this.props.institute.name);
    doc.setTextColor("black");
    doc.setFontSize(15);
    line += 10;
    const address ='                       ' +
      this.props.institute.address +
      " " +
      ", " +
      this.props.institute.state +
      " " +
      ", " +
      this.props.institute.country;
    doc.text(25, line, address);
    line += 10;
    const subject_line = `Subject : ${this.props.subject_name}                                                         Total marks : ${this.props.pattern.tm}`;
    doc.text(15, line, subject_line);
    line += 10;
    doc.setLineWidth(1);
    doc.line(20, line, 200, line);

    line += 10;

    console.log(selectedQuestions);
    var page = 200;
    for (var i = 0; i < selectedQuestions.length; i++) {
      line += 10;
      doc.text(20, parseInt(line), `Section ${i + 1}`);
      for (var j = 0; j < selectedQuestions[i].length; j++) {
        const text = `Q.${(j + 1).toString()}      ${
          selectedQuestions[i][j].question
        }`;
        line += 10;
        console.log("q", line);
        doc.text(20, parseInt(line), text);
        doc.text(180, parseInt(line), selectedQuestions[i][j].mark.toString());
        if (line > page) {
          doc.addPage();
          line = 10;
          // page += 90
          // doc.set_page(2)
        }
      }
      line += 10;
      if (i === selectedQuestions.length - 1) {
        doc.save(`${this.props.subject_name}_digitalexaminer`);
      }
    }
  };
  render() {
    return (
      <div>
        {console.log(this.props.pattern)}
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
              <Button onClick={this.generatePDF}>Download PDF</Button>
              <h1 style={{ color: "red" }}>Selected Questions</h1>
              <h3>Institute Name: {this.props.institute.name}</h3>
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
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
