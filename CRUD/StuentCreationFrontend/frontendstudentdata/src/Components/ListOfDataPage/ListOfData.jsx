import React, { useEffect, useState } from 'react'
import './ListOfData.css';
import { Button, Icon, List, Table, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Search, SearchOff, SearchTwoTone, Update } from '@mui/icons-material';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import axios from 'axios';
import Navbar from '../NavbarPage/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

function ListOfData() {

  // Fetch Datas From Backend
  const [getD, setgetD] = useState([]);

  async function FetchData() {
    const { data } = await axios.get("http://localhost:8080/stud/FetchList")
    console.log(data)
    setgetD(data)
  }

  useEffect(() => {
    FetchData()
  }, [])

  // Update data using Rollno
  const useNav = useNavigate();
  function UpdateDatas(Rno) {
    useNav(`/Update/${Rno}`);
  }


  // Delete Data From Frontend
  async function DeleteDatas(id) {

    const confirm = window.confirm("Do you want to delete");
    if (confirm) {
      axios.delete("http://localhost:8080/stud/deleteRollNo/" + id).then(() => {
        // window.location.reload();
        setgetD(getD.filter((u) => u.rollNo !== id));
      })
        .catch((err) => console.log(err))

    }

  }

  // Search Data By Their Details
  const [SearchData, setSearchData] = useState("");

  function OnchangeSearch(e) {
    // Update the search data state
    setSearchData(e.target.value);
  }

  const FilteredgetD = getD.filter((record) => {
    // Ensure `SearchData` is defined and convert it into an array of cleaned search terms
    const searchTerms = (SearchData || "")
      .toLowerCase()
      .split(",")
      .map((term) => term.trim())
      .filter((term) => term); // Remove empty terms

    // Return true if all search terms match at least one property of the record
    return searchTerms.every((term) =>
      [
        record.rollNo?.toString(),
        record.studentName?.toLowerCase(),
        record.courseName?.toLowerCase(),
        record.section?.toLowerCase(),
        record.joinDate?.toString(),
        record.completionDate?.toString(),
        record.address?.toLowerCase(),
        record.phoneNo?.toString(),
        record.emailId?.toLowerCase(),
      ].some((property) => property?.includes(term))
    );
  });

  // Sorted Order Datas Here
  const [sortKey, setSortkey] = useState("rollNo");
  const [sortDirection, setSortDirection] = useState("asc")

  function handleSort(key) {
    const newDirection = sortKey === key && sortDirection === "asc" ? "desc" : "asc";
    setSortkey(key);
    setSortDirection(newDirection);
  };

  const SortedgetD =[...FilteredgetD].sort((a, b) => {
    
    let comparision = 0;

    if (sortKey === "rollNo") {
      comparision = a.rollNo - b.rollNo;
    }else if(sortKey === "studentName"){
      comparision =a.studentName.localeCompare(b.studentName);  
    }else if(sortKey === "courseName"){
      comparision =a.courseName.localeCompare(b.courseName);
    }else if(sortKey === "section"){
      comparision =a.section.localeCompare(b.section) 
    }else if(sortKey === "joinDate"){
      comparision =a.joinDate.localeCompare(b.joinDate)
    }else if(sortKey === "completionDate"){
      comparision =a.completionDate.localeCompare(b.completionDate)
    }else if(sortKey === "address"){
      comparision =a.address.localeCompare(b.address) 
    }else if(sortKey === "phoneNo"){
      comparision =a.phoneNo.localeCompare(b.phoneNo)
    }else if(sortKey === "emailId"){
      comparision =a.emailId.localeCompare(b.emailId)
    }
    return sortDirection === "asc" ? comparision : -comparision;
  });


  // Pagenation
  const [Currentpage, setCurrentpage] = useState(1);
  const [userPerpage,setuserPerpage] = useState(5);

  function setpage(e){ 
    if (e.target.value === "0") {
      e.target.value =5; // Clear the input if 0 is entered
    }
    const val=parseInt(e.target.value) 
    setuserPerpage(val);
  }

  const IndexOfLastUser = Currentpage * userPerpage;
  const IndexOfFirstUser = IndexOfLastUser - userPerpage
  const currrentgetD = SortedgetD.slice(IndexOfFirstUser, IndexOfLastUser)

  function pagenation(pageNumber) {
    setCurrentpage(pageNumber)
  }
  const totalPages = Math.ceil(SortedgetD.length / userPerpage)


  return (
    <div className='ListOfData-container' id='SList'>
      <Navbar />
      <div className="ListOfData-content">
        <div className="List-title">List Of Students Datas</div>
        <div className="Top-div-Bar">
          <div className="Search-div" id='Sdiv'>
            <input type="text" className='search-input' id='search' onChange={(e) => OnchangeSearch(e)} placeholder='Search Here'></input>
            <Search sx={{ color: "#27797c", marginLeft: "10px", cursor: "pointer" }} id='Search-icon' />
          </div>
          <div className="Add-data"><Link to={"/"}><Button variant="contained" endIcon={<AddCircleOutlineSharpIcon />}>Add Details</Button></Link></div>
        </div>
        <div>
          <table className="Table-div">
            <thead>
              <tr>
                <td onClick={()=>handleSort("rollNo")} style={{cursor:"pointer"}}>
                  Roll Number
                  {sortKey === "rollNo" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}
                  </td>
                <td onClick={()=>handleSort("studentName")} style={{cursor:"pointer"}}>
                  Student Name
                  {sortKey === "studentName" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}
                  </td>
                <td onClick={()=>handleSort("courseName")} style={{cursor:"pointer"}}>
                  Course Name
                  {sortKey === "courseName" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}</td>
                <td onClick={()=>handleSort("section")} style={{cursor:"pointer"}}>
                  Section Name
                  {sortKey === "section" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}
                  </td>
                <td onClick={()=>handleSort("joinDate")} style={{cursor:"pointer"}}>
                  Joining Date
                  {sortKey === "joinDate" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}
                  </td>
                <td onClick={()=>handleSort("completionDate")} style={{cursor:"pointer"}}>
                  Completion Date
                  {sortKey === "completionDate" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}
                  </td>
                <td onClick={()=>handleSort("address")} style={{cursor:"pointer"}}>
                  Address
                  {sortKey === "address" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}
                  </td>
                <td onClick={()=>handleSort("phoneNo")} style={{cursor:"pointer"}}>
                  Phone Number
                  {sortKey === "phoneNo" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}</td>
                <td onClick={()=>handleSort("emailId")} style={{cursor:"pointer"}}>
                  Email Id
                  {sortKey === "emailId" && (
                  <FontAwesomeIcon
                    icon={sortDirection === "asc" ? faSortUp : faSortDown}
                    style={{ marginLeft: "5px" }}/>
                  )}
                  </td>
                <td>Update</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {currrentgetD.map((e) => (
                <tr>
                  <td>{e.rollNo}</td>
                  <td>{e.studentName}</td>
                  <td>{e.courseName}</td>
                  <td>{e.section}</td>
                  <td>{e.joinDate}</td>
                  <td>{e.completionDate}</td>
                  <td>{e.address}</td>
                  <td>{e.phoneNo}</td>
                  <td>{e.emailId}</td>
                  <td><Update title="Update" className='Update-button' onClick={() => UpdateDatas(e.rollNo)} /></td>
                  <td><Delete title="Delete" className='Delete-button' onClick={() => DeleteDatas(e.rollNo)} /></td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
        <div className="PageNation">
          <div className="Pnation-button">
            <Button variant="contained" onClick={() => pagenation(Currentpage - 1)} disabled={Currentpage === 1} startIcon={<UndoRoundedIcon />}>Previous</Button>
            <div className='Btn-class-div'>
            <input onChange={(e)=>setpage(e)} style={{width:"3vw", borderRadius:"4px", border:"none",outline:"none", paddingLeft:"15px"}} min="1"></input>

              {Array.from({ length: totalPages }, (_, index) => (
                <button variant="contained" key={index + 1} onClick={() => pagenation(index + 1)} className={`btn ${Currentpage === index + 1 ? "btn-info" : "btn-light"}`}>{index + 1}</button>
              ))}
            </div>
            <Button variant="contained" onClick={() => pagenation(Currentpage + 1)} disabled={Currentpage === totalPages} sx={{ width: "10vw" }} endIcon={<RedoRoundedIcon />}>Next</Button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ListOfData