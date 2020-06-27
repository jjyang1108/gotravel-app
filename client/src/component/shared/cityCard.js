import React from "react";
import { Card } from "react-bootstrap";
import "./shared.css";
import { Link } from "react-router-dom";

const CityCard = ({ city }) => (
  <Card className="cardCity">
    <a href={`/explore/city/${city.name}&${city._id}`} className="img-block">
      <Card.Img src={city.representPic} alt="Card image" />
    </a>
    <div className="card-country">{city.country}</div>
    <div className="card-city">
      <span className="card-city-name">
        <Link to ={`/explore/city/${city.name}&${city._id}`}>{city.name}</Link>
      </span>
      <br />
      <span className="card-city-placeNums">{city.placeNum} places</span>
    </div>
  </Card>
);

export default CityCard;
