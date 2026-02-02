import axios from 'axios'

import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Ct from './Ct'
import { useRef } from 'react'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Hallticket = () => {
  let [data, setData] = useState({})
  let obj = useContext(Ct)
  let pdfref = useRef()
  useEffect(() => {

    axios.get(`http://localhost:5000/search/${obj.state._id}`).then((res) => {
      setData(res.data[0])

    })

  }, [])
  let dwl = async () => {
    const element = pdfref.current;

    const canvas = await html2canvas(element, {
      scale: 2,          // better quality
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("ht.pdf");
  };
  return (<>
    <div className="hallticket-card" ref={pdfref}>
      <p>Name : {data.name}</p>
      <p>Hall ticket No : {data.hno}</p>
      <p>E-mail : {data._id}</p>
      <p>Phone no : {data.phno}</p>

    </div>
    <button className="download-btn" onClick={dwl}>Download</button>
  </>
  )
}

export default Hallticket