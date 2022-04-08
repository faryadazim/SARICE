import React from "react";
import "./NewComponent.css";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";
const NewCom = (props) => {
  console.log(props.valueForNewComponent);
  return (
    <div>
      <Modal
        {...props}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Attachments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} md={12}>
                <div>
                  <table className="table borderless" border="0">
                    <tbody className="p-5">
                      {props.valueForNewComponent.attachments == null ||
                      props.valueForNewComponent.attachments == undefined ||
                      props.valueForNewComponent.attachments == "" ||
                      props.valueForNewComponent.attachments == " " ? (
                        <p className="my-2 mt-3">
                          <b>No Attachment Available </b>
                        </p>
                      ) : (
                        props.valueForNewComponent.attachments
                          .split(",")
                          .map((eachFile, index) => {
                            return (
                              <>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td width="70%" className="text-left">
                                    <b> {eachFile.slice(15)}</b>
                                  </td>
                                  <td width="15%" className="text-right">
                                    <button
                                      className="btn btn-sm btnw-25 btn-dark marginForDeleteButtonInModel"
                                      onClick={() => {
                                        window.open(
                                          `http://sa-hrm.genial365.com${eachFile}`
                                        );
                                      }}
                                    >
                                      View
                                      <i
                                        className="fa fa-eye ml-2 "
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                      )}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>

            <Row></Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={props.onHide}
            className="btn btn-sm"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewCom;
