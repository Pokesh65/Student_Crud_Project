package com.demo.Studentdetails.service;

import java.util.List;
import java.util.Optional;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.demo.Studentdetails.entity.StudentData;
import com.demo.Studentdetails.repository.SdRepository;

@Service
public class SdService {
	
	@Autowired
	private SdRepository SdRepo;
	
// Posting data
	public String Postdataa(StudentData Std){
		SdRepo.save(Std);
		return "Your Date is Inserted";
		
	}
	
// fetching all data and send them to controller
	public List<StudentData> Findalldata(){
		return SdRepo.findAll();
	}
	

	
//Get Datas By Id
	public StudentData dataById(int id){
		Optional<StudentData> sddata=SdRepo.findById(id);
		if(sddata.isPresent()){
			return SdRepo.findById(id).get();
		}

		return null;
	}

	
// get data by name using path variable
	 public List<StudentData> nameFind(String studName){
			return SdRepo.findBystudentName(studName);
			  
		  }
	 
	 
// get data by Course using path variable
	 public List<StudentData> CourseFind(String studName){
			return SdRepo.findBycourseName(studName);
				  
	 	  }
	 
//	delete value by id 
	 public String DeletevalueId(int id){
		SdRepo.deleteById(id);
		return "Your Data Is Deleted";
		 
	 }
	 
	 
//	delete values By name
	 public void DeleteWithName(String name){
		 SdRepo.deleteBystudentName(name);
	 }
	 
	 
//	Update the value Here
	 public String UpdateAllDatas(int id,StudentData sd){
		
		 Optional<StudentData> Sdata=SdRepo.findById(id);
		 
		 if(!Sdata.isPresent()){
			 return "No Data Found Try With Different Id Number";
		 }
		 StudentData studData=Sdata.get();
		 
		 if(!sd.getStudentName().isBlank()){
			 studData.setStudentName(sd.getStudentName());
		 }
		 if(!sd.getCourseName().isBlank()){
			 studData.setCourseName(sd.getCourseName());
		 }
		 if(!sd.getSection().isBlank()){
			 studData.setSection(sd.getSection());
		 }
		 if(!sd.getJoinDate().isBlank()){
			 studData.setJoinDate(sd.getJoinDate());
		 }
		 if(!sd.getCompletionDate().isBlank()){
			 studData.setCompletionDate(sd.getCompletionDate());
		 }
		 if(!sd.getAddress().isBlank()){
			 studData.setAddress(sd.getAddress());
		 }
		 if(!sd.getPhoneNo().isBlank()){
			 studData.setPhoneNo(sd.getPhoneNo());
		 }
		 if(!sd.getEmailId().isBlank()){
			 studData.setEmailId(sd.getEmailId());
		 }
		 SdRepo.save(studData);
		 
		 return "Your Data Has Been Updated Successfully";
	 }
	 

}
