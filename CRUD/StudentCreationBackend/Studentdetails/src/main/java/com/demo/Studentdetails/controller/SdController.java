package com.demo.Studentdetails.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.Studentdetails.entity.StudentData;
import com.demo.Studentdetails.service.SdService;


@CrossOrigin("*")
@RestController
@RequestMapping("/stud")
public class SdController {
	
	@Autowired
	private SdService service;
	
	@GetMapping("/Get")
	public String Value(){
		return "Hello Pokesh";
	}
	
//	Posting datas here
	@PostMapping("/DataEnter")
	public String Postdata(@RequestBody StudentData Sdc){
		return service.Postdataa(Sdc);
	}
	
//	Get all value
	@GetMapping("/FetchList")
	public List<StudentData> Fetchdata(){
		return service.Findalldata();
	}
	
// get value by Id
	@GetMapping("/GetbyId")
	public StudentData GetdataByIda(@RequestParam int id){
		return service.dataById(id);
	}
	
// get value by Id
	@GetMapping("/GetbyId/{id}")
	public StudentData GetByIda(@PathVariable("id") int id){
		return service.dataById(id);
	}
	
//	get value by Id using use pathvariable
	@GetMapping("/getByName/{n}")
	public List<StudentData> getdatabynamepath(@PathVariable("n") String studentName){
		return service.nameFind(studentName);
		
	}
	
	
	@GetMapping("/getByCourse/{c}")
	public List<StudentData> getdatabyCourse(@PathVariable("c") String studentName){
		return service.CourseFind(studentName);
		
	}
	
//  Delete value By id 
	@DeleteMapping("/deleteRollNo/{id}")
	public String DeleteValue(@PathVariable("id")int id){
		return service.DeletevalueId(id);
		
	}
	
//	Delete Data By Studentname
	 @DeleteMapping("/deleteName/{name}")
	 public String deletename(@PathVariable("name") String name){
		 service.DeleteWithName(name);
		return "Data Has Been Deleted";
		 
	 }
	
//	Update Values here
	@PostMapping("/Update/{id}")
	public String UpdateValue(@PathVariable("id") int id,@RequestBody StudentData Sd){
		return service.UpdateAllDatas(id,Sd);
	}
	
	
	
	


	
		
		
	
	

}
