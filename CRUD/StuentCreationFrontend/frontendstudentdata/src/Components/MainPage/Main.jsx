import React, { useState } from 'react'
import './Main.css';
import './Input.css';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Autocomplete, Button, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RestartAltSharpIcon from '@mui/icons-material/RestartAltSharp';
import StorageSharpIcon from '@mui/icons-material/StorageSharp';
import axios from 'axios';



function Main() {


  const [saveD, setsaveD] = useState({ Sname: "", Scourse: "", Ssection: "", SJoin: "", SComplete: "", Saddress: "", Sphone: "", Semail: "" });

  function PassInputValue(e) {
    setsaveD({ ...saveD, [e.target.name]: e.target.value, });
    console.log(saveD)

  }

  // clear Error Form
  function ClearForm() {
    setsaveD({ Sname: "", Scourse: "", Ssection: "", SJoin: "", SComplete: "", Saddress: "", Sphone: "", Semail: "" });
    seterrors({});
  }

  // Push Data To The Backend Here
  async function SendDatas(e) {
    e.preventDefault()
    const { data } = await axios.post("http://localhost:8080/stud/DataEnter", {
      studentName: saveD.Sname,
      courseName: saveD.Scourse,
      section: saveD.Ssection,
      joinDate: saveD.SJoin,
      completionDate: saveD.SComplete,
      address: saveD.Saddress,
      phoneNo: saveD.Sphone,
      emailId: saveD.Semail
    })
    console.log(data)
    alert("Data Submitted Successfully")
    ClearForm();
  };




  const [errors, seterrors] = useState({});
  // Validation Check
  function handleSubmit(e) {
    e.preventDefault();
    const validationError = {};

    if (!saveD.Sname.trim()) {
      validationError.Sname = "Enter Student name"
    }

    if (!saveD.Scourse.trim()) {
      validationError.Scourse = "Select Course"
    }

    if (!saveD.Ssection.trim()) {
      validationError.Ssection = "Section is Required"
    } else if (!/^[a-zA-Z]$/.test(saveD.Ssection)) {
      validationError.Ssection = "Select A To Z"
    }

    if (!saveD.SJoin.trim()) {
      validationError.SJoin = "Enter Date"
    } else if (!/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(saveD.SJoin)) {
      validationError.SJoin = "DD-MM-YYYY Format";
    }

    if (!saveD.SComplete.trim()) {
      validationError.SComplete = "Enter Date"
    } else if (!/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(saveD.SComplete)) {
      validationError.SComplete = "DD-MM-YYYY Format";
    } else {
      const [jday, jmonth, jyear] = saveD.SJoin.split("-").map(Number);
      const [cday, cmonth, cyear] = saveD.SComplete.split("-").map(Number);

      const JdateObj = new Date(jyear, jmonth - 1, jday);
      const CdateObj = new Date(cyear, cmonth - 1, cday);

      if (CdateObj <= JdateObj) {
        validationError.SComplete = "Greater Than JoinDate"
      }
    }

    if (!saveD.Saddress.trim()) {
      validationError.Saddress = "Enter Address"
    }

    if (!saveD.Sphone.trim()) {
      validationError.Sphone = "Enter Phone Number"
    } else if (!/^[0-9]+$/.test(saveD.Sphone)) {
      validationError.Sphone = "Must be Number"
    }
    else if (saveD.Sphone.length !== 10) {
      validationError.Sphone = "Must be 10 Number"
    }

    if (!saveD.Semail.trim()) {
      validationError.Semail = "Enter Email ID"
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(saveD.Semail)) {
      validationError.Semail = "example@example.com"
    }

    seterrors(validationError)

    if (Object.keys(validationError).length === 0) {
      SendDatas(e)
    }

  }




  // const PassInputValue = (e) => {
  //   // const { name, value } = e.target;
  //   setsaveD({ saveD, [e.target.id]: e.target.value, });
  //   console.log(saveD)
  // };

  const navi = useNavigate();

  function Goback() {
    navi("/List")
  }


  return (
    <div className='Main-container'>
      <div className="MainBox">
        <div className='Main-From-Box'>
          <form className="From-box" onSubmit={handleSubmit}>
            <div className='Row-One'>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" value={saveD.Sname} type="text" name='Sname' placeholder='' onChange={(e) => PassInputValue(e)} />
                  <div class="labelline">Student Name</div>
                  <p className='P-validation'>{errors.Sname}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <select name='Scourse' value={saveD.Scourse} id="course" placeholder='' onChange={(e) => PassInputValue(e)}>
                    <option>Select Course</option>
                    <option value="MCA">MCA</option>
                    <option value="ECE">B.E. Electronics and Communication Engg.</option>
                    <option value="CSE">B.E. Computer Science and Engineering</option>
                    <option value="IT">B.Tech. Information Technology</option>
                    <option value="BME">B.E. Biomedical Engineering</option>
                    <option value="MELE">B.E. Medical Electronics</option>
                    <option value="CCE">B.E. Computer and Communication Engg.</option>
                    <option value="ETE">B.E. Electronics and TeleCommunication Engg.</option>
                    <option value="AIDS">B.Tech. Artificial Intelligence and Data Science</option>

                  </select>
                  <div class="labelline">Course Name</div>
                  <p className='P-validation'>{errors.Scourse}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" value={saveD.Ssection} name='Ssection' type="text" placeholder='' onChange={(e) => PassInputValue(e)} />
                  <div class="labelline">Section</div>
                  <p className='P-validation'>{errors.Ssection}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" value={saveD.SJoin} name='SJoin' type="text" placeholder='' onChange={(e) => PassInputValue(e)} />
                  <div class="labelline">Join Date</div>
                  <p className='P-validation'>{errors.SJoin}</p>
                </div>
              </div>

            </div>
            <div className='Row-Two'>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" value={saveD.SComplete} name='SComplete' type="text" placeholder='' onChange={(e) => PassInputValue(e)} />
                  <div class="labelline">Completion Date</div>
                  <p className='P-validation'>{errors.SComplete}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" value={saveD.Saddress} name='Saddress' type="text" placeholder='' onChange={(e) => PassInputValue(e)} />
                  <div class="labelline">Address</div>
                  <p className='P-validation'>{errors.Saddress}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" value={saveD.Sphone} name='Sphone' type="text" placeholder='' onChange={(e) => PassInputValue(e)} />
                  <div class="labelline">Phone Number</div>
                  <p className='P-validation'>{errors.Sphone}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" value={saveD.Semail} name='Semail' type="text" placeholder='' onChange={(e) => PassInputValue(e)} />
                  <div class="labelline">Email Id</div>
                  <p className='P-validation'>{errors.Semail}</p>
                </div>
              </div>

            </div>
            <div className='Row-Three'>
              <Button variant="contained" type='submit' endIcon={<SendIcon />}>Send</Button>
              <Button variant="contained" type="reset" endIcon={<RestartAltSharpIcon />} onClick={() => ClearForm()}>Clear</Button>
              <Button variant="contained" endIcon={<StorageSharpIcon />} onClick={() => Goback()}>List</Button>
            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default Main