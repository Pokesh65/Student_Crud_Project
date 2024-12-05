import React, { useEffect, useState } from 'react'
import './Update.css';
// import './Input.css';
import Navbar from '../NavbarPage/Navbar'
import { Autocomplete, Button, TextField } from '@mui/material'
import styled from '@emotion/styled'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Updatedata() {


  // Fetch Data By Id Which is Passed By ListOfData Pages
  const [FetchD, setFetchD] = useState({
    studentName: "",
    courseName: "",
    section: "",
    joinDate: "",
    completionDate: "",
    address: "",
    phoneNo: "",
    emailId: ""
  });

  // UseNavigate
    const navi=useNavigate();

  // fetch from data base
  const{id}=useParams();
  async function GetDataFromDB() {
    try{
    const response=await axios.get(`http://localhost:8080/stud/GetbyId/${id}`);
    console.log(response.data)    
    setFetchD(response.data)

    }
    catch(error){
      console.log("Error Fetching Data "+error)
    }
    
  }

  useEffect(()=>{
    GetDataFromDB();
  },[id])

  //Onchnage Data Update
  function Onchangedata(e){
    setFetchD({ ...FetchD, [e.target.name]: e.target.value }); // Update state
    console.log(FetchD)

  }

  // Update Data 
   function UpdateGivenData(e) {
    e.preventDefault();
     axios.post("http://localhost:8080/stud/Update/"+id,FetchD).then((res)=>{
      console.log(res)
      navi("/List");
     })
    
    
  }

  const[errors,seterrors]=useState({});
  // Validation Check
  function handleSubmit(e){
    e.preventDefault();
    const validationError={};

    if(!FetchD.studentName.trim()){
      validationError.studentName="Enter Student name"
    }

    if(!FetchD.courseName.trim()){
      validationError.courseName="Select Course"
    }

    if(!FetchD.section.trim()){
      validationError.section="Section is Required"
    }else if(!/^[a-zA-Z]$/.test(FetchD.section)){
      validationError.section="Select A To Z"
    }

    if(!FetchD.joinDate.trim()){
      validationError.joinDate="Enter Date"
    } else if (!/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(FetchD.joinDate)) {
      validationError.joinDate = "DD-MM-YYYY Format";
    }

    if(!FetchD.completionDate.trim()){
      validationError.completionDate="Enter Date"
    }else if(!/^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(FetchD.completionDate)) {
      validationError.completionDate = "DD-MM-YYYY Format";
    }else{
      const[jday,jmonth,jyear]=FetchD.joinDate.split("-").map(Number);
      const[cday,cmonth,cyear]=FetchD.completionDate.split("-").map(Number);

      const JdateObj=new Date(jyear,jmonth-1,jday);
      const CdateObj=new Date(cyear,cmonth-1,cday);

      if(CdateObj<=JdateObj){
        validationError.completionDate="Greater Than JoinDate"
      }
    }

    if(!FetchD.address.trim()){
      validationError.address="Enter Address"
    }

    if(!FetchD.phoneNo.trim()){
      validationError.phoneNo="Enter Phone Number"
    }else if(!/^[0-9]+$/.test(FetchD.phoneNo)){
      validationError.phoneNo="Must be Number"
    }
    else if(FetchD.phoneNo.length!==10){
      validationError.phoneNo="Must be 10 Number"
    }

    if(!FetchD.emailId.trim()){
      validationError.emailId="Enter Email ID"
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(FetchD.emailId)){
      validationError.emailId="example@example.com"
    }
   
    seterrors(validationError)

    if(Object.keys(validationError).length===0){
      UpdateGivenData(e);
      alert("Updated SuccessFully")
    }

  }

  // Send Data
  // function handleSubmit(e){
  //   UpdateGivenData(e);
  // }

  function Goback() {
    navi("/List");
  }


  return (
    <div className='Update-container' id='SUpdate'>
      <Navbar />
      <div className="Update-content">
        <div className='Update-tittle'><h2>Update  Student  Data</h2></div>
        <div id="" className='Update-content-form'>
          <form className='Form-Div' onSubmit={handleSubmit}>
            <div className='Ipd-Row-One'>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" name='studentName' value={FetchD.studentName} onChange={(e)=> Onchangedata(e)} type="text" />
                  <div class="labelline">Student Name</div>
                  <p className='P-validation'>{errors.studentName}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <select name="courseName" id="cars" onChange={(e)=> Onchangedata(e)}>
                    <option value={FetchD.courseName}>{FetchD.courseName}</option>
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
                  <p className='P-validation'>{errors.courseName}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" name='section' value={FetchD.section}  onChange={(e)=> Onchangedata(e)}  type="text"  />
                  <div class="labelline">Section</div>
                  <p className='P-validation'>{errors.section}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" name='joinDate' value={FetchD.joinDate}  onChange={(e)=> Onchangedata(e)}  type="text"  />
                  <div class="labelline">Join Date</div>
                  <p className='P-validation'>{errors.joinDate}</p>
                </div>
              </div>
            </div>
            <div className='Ipd-Row-Two'>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" name='completionDate' value={FetchD.completionDate}  onChange={(e)=> Onchangedata(e)}  type="text" required />
                  <div class="labelline">Completion Date</div>
                  <p className='P-validation'>{errors.completionDate}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" name='address' value={FetchD.address}  onChange={(e)=> Onchangedata(e)}  type="text" required />
                  <div class="labelline">Address</div>
                  <p className='P-validation'>{errors.address}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" name='phoneNo' value={FetchD.phoneNo}  onChange={(e)=> Onchangedata(e)}  type="text" required />
                  <div class="labelline">Phone Number</div>
                  <p className='P-validation'>{errors.phoneNo}</p>
                </div>
              </div>
              <div class="Input-container">
                <div class="entryarea">
                  <input class="inputCl" name='emailId' value={FetchD.emailId}  onChange={(e)=> Onchangedata(e)}  type="text" required />
                  <div class="labelline">Email Id</div>
                  <p className='P-validation'>{errors.emailId}</p>
                </div>
              </div>

            </div>
            <div className='Ipd-Row-Three'>
              <Button variant="contained" type='submit' endIcon={<ChangeCircleOutlinedIcon />} >Update</Button>
              <Button variant="contained" type='reset' endIcon={< HighlightOffIcon />} onClick={() => Goback()}>Cancel</Button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Updatedata