package com.demo.Studentdetails.repository;



import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.demo.Studentdetails.entity.StudentData;

public interface SdRepository extends JpaRepository<StudentData, Integer>{

	public List<StudentData> findBystudentName(String studentName);
	
	public List<StudentData> findBycourseName(String courseName);	
	
	
	// We need to use (Modifying) and (transactional) and then Query anotation here to write 
	// Sql query here in spring boot 
	@Modifying
	@Transactional
	@Query(value="delete from student_data where student_name=?1",nativeQuery =true)
	public void deleteBystudentName(String studentName);
	
	
	
//	public void deleteBystudentName(String studentName); //we can't delete by name like using this methods
//	that's why i'm writing Sql native Query above to delete by name
	 
}
