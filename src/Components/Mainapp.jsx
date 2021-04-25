import React, { useState } from "react";
import Axios from "axios";

function Mainapp() {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [xmlFile, setXmlFile] = useState("");

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

  return (
    <div>
      <h1>Hello React</h1>
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
      <div>{imageName && <img src={imageName} alt="ml" />}</div>
    </div>
  );
}

export default Mainapp;
