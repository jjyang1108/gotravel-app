import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import PlaceCard from "../shared/placeCard";

export default class ExploreCategoryPage extends Component {
  state = {
    placeList: [],
  };
  componentDidMount() {
    axios
      .get(
        `/explore/place/getPlacesByCategory/${this.props.match.params.category}`
      )
      .then((res) => {
        this.setState({ placeList: res.data });
      });
  }
  render() {
    return (
      <>
        <div className="subpage-topblock">
          <div className="subpage-topblock-container">
            <div className="subpage-topblock-left"></div>
            {this.props.match.params.category === "see & do" ? (
              <img
                className="subpage-topblock-pic"
                alt="top pic"
                src={`https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60`}
              ></img>
            ) : this.props.match.params.category === "food & drink" ? (
              <img
                className="subpage-topblock-pic"
                alt="top pic"
                src={`https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60`}
              ></img>
            ) : (
              <img
                className="subpage-topblock-pic"
                alt="top pic"
                src={`https://images.unsplash.com/photo-1582239105560-588fb10baf27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60`}
              ></img>
            )}
          </div>
        </div>
        <hr></hr>
        <Container>
          <h2>Place Lists</h2>
          <Row>
            {this.state.placeList.map((item, i) => {
              return (
                <Col className="sub-block-col col-6 clo-md-4 col-lg-3" key={i}>
                  <PlaceCard place={item} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    );
  }
}
