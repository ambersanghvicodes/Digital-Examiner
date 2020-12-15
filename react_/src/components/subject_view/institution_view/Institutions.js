import React, { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import InstitutionList from "./InstitutionList";
import axios from "axios";
import AddInstitution from "./AddInstitution";
export default class Institutions extends Component {
  state = {
    addInstitution: false,
    institutions: [],
  };
  componentDidMount = () => {
    let token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api_view/institutions/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ institutions: res.data });
      })
      .then((err) => {
        console.log(err);
      });
  };
  dltInstitution = (id) => {
    let token = localStorage.getItem("token");
    console.log(id);
    axios
      .delete(`http://127.0.0.1:8000/api_view/institutions/${id}/`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState((state) => ({
          institutions: [
            ...state.institutions.filter(
              (institution) => institution.id !== id
            ),
          ],
        }));
      })
      .then(window.alert("Institution Deleted Successfully."));
  };
  submitInstitution = (institute_name, address, city, state, country) => {
    let data = {
      name1: institute_name,
      address: address,
      city: city,
      state: state,
      country: country,
    };
    const token = localStorage.getItem("token");

    this.setState({ addPattern: false });
    axios
      .post(`http://127.0.0.1:8000/api_view/institutions/`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ institutions: [...this.state.institutions, res.data] });
      })
      .then(this.setState({addInstitution : false}))
      .catch((err) => {
        console.log(err);
      });
  };
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
              List of Institutions
            </Modal.Title>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Header>
          <Modal.Body>
            <div>
              <center>(click on the checkbox to select one)</center>
              {this.state.institutions.map((institution) => (
                <InstitutionList
                  key={institution.id}
                  institution={institution}
                  changeInstitution={this.props.changeInstitution}
                  dltInstitution={this.dltInstitution}
                />
              ))}
              {this.state.addInstitution ? (
                <>
                  <AddInstitution
                    closeBtn={() => {
                      this.setState({ addInstitution: false });
                    }}
                    submitInstitution={this.submitInstitution}
                  />
                </>
              ) : (
                <>
                  <center>
                    <Button
                      variant="success"
                      onClick={() => {
                        this.setState({ addInstitution: true });
                      }}
                    >
                      Add Institution
                    </Button>
                  </center>
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
