import React, { useState } from "react";
import Axios from "axios";
import { CSVLink } from "react-csv";

function Mainapp() {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [xmlFile, setXmlFile] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [csvData, setCsvData] = useState([]);

  const _detection = async () => {
    console.log(image);
    console.log(xmlFile);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("xml", xmlFile);

    let { data } = await Axios.post(
      "http://localhost:5000/detection",
      formData
    );
    setImageName("http://localhost:5000/output/" + image.name);
    console.log(data);
  };

  const _setStartDate = async (value) => {
    let date = new Date(value);
    let timestamp = date.getTime();
    timestamp = timestamp.toString();
    timestamp = timestamp.slice(0, -3);
    timestamp = parseInt(timestamp);
    setStartDate(timestamp);
  };

  const _setEndDate = async (value) => {
    let date = new Date(value);
    let timestamp = date.getTime();
    timestamp = timestamp.toString();
    timestamp = timestamp.slice(0, -3);
    timestamp = parseInt(timestamp);
    setEndDate(timestamp);
  };

  const _fetchCSVData = async () => {
    console.log({
      startDate,
      endDate,
    });
    if (!startDate || !endDate) {
      alert("Select Date");
    } else {
      let { data } = await Axios.post("http://localhost:5000/generateCSV", {
        startDate,
        endDate,
      });
      setCsvData(data);
      console.log(data);
    }
  };

  return (
    <div>
      <h1>Baggage AI</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <div>
              <h3>Image</h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div>
              <h3>XML</h3>
              <input
                type="file"
                accept=".xml"
                onChange={(e) => setXmlFile(e.target.files[0])}
              />
            </div>
            <button className="btn btn-danger" onClick={_detection}>
              Image Detection
            </button>
          </div>
          <div className="col-6">
            <div>
              <p>
                NOTE* Please click on fetch data button first then click
                Generate CSV button
              </p>
              Start Date{" "}
              <input
                type="date"
                name="startDate"
                onChange={(e) => _setStartDate(e.target.value)}
              />
              <br />
              End Date{" "}
              <input
                type="date"
                name="endDate"
                onChange={(e) => _setEndDate(e.target.value)}
              />
              <br />
              {csvData.length > 0 ? (
                <CSVLink
                  data={csvData}
                  filename={"Baggage_Report.csv"}
                  className="btn btn-success"
                >
                  Generate CSV
                </CSVLink>
              ) : (
                <button
                  className="btn btn-warning"
                  style={{ color: "#fff" }}
                  onClick={_fetchCSVData}
                >
                  Fetch CSV Data
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>{imageName && <img src={imageName} alt="ml" />}</div>
    </div>
  );
}

export default Mainapp;
