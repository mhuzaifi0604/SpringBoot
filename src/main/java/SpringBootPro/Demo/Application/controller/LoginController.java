package SpringBootPro.Demo.Application.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import JWTUtils.JWTUtil;
import SpringBootPro.Demo.Application.Service.LoginService;
import SpringBootPro.Demo.Application.Service.SignupService;
import SpringBootPro.Demo.Application.Service.AddStudent;
import SpringBootPro.Demo.Application.model.Login;
import SpringBootPro.Demo.Application.model.Signup;

@RestController
public class LoginController {

	@Autowired
	private LoginService login_service;
	
	@Autowired
	private SignupService signup_service;
	
	@Autowired
	private AddStudent addStudent;
	
	public String subject;

	@PostMapping(path = "/Login", consumes = "application/json", produces="application/json")
	public Map<String, String> GetLoginCreds(@RequestBody Map<String, Object> Creds) {
		System.out.println(Creds.get("username") + " & " + Creds.get("password"));
		 List<Login> data = this.login_service.getLoginData();
		 System.out.println("Data: " +  data);
		 Map<String, String> Converter = new HashMap<>();
		 for (Login login : data) {
			    if (login.getUsername().equals(Creds.get("username")) && login.getPassword().equals(Creds.get("password"))) {
			        System.out.println("Found matching credentials: " + login);
			        String Token = JWTUtil.generateToken(login.getUsername());
			        String result = this.login_service.AddtokentoDB(Token, login.getId());
			        System.out.printf("Token Addition: " + result);
			        subject = login.getUsername();
			        Converter.put("Token", Token);
			        Converter.put("Message", "Logged In Successfully!!");
					return Converter; 
			    }
			}
		 Converter.put("Message", "No Such User Found!!");
		 return Converter;
	}
	
	@PostMapping(path="/Signup", consumes="application/json", produces = "application/json")
	public Map<String, String> SignUp(@RequestBody Map<String, Object> User_Details) {
		String result = this.signup_service.getUserDetails(User_Details);
		System.out.println("Result: " + result);
		Map<String, String> Converter = new HashMap<>();
		Converter.put("Status", result);
		return Converter;
	}
	
	@PostMapping(path="/AddStudent", consumes="application/json", produces="application/json")
	public Map<String, String> AddStudent(@RequestBody Map<String, Object> details, @RequestHeader (name="Authorization") String JWT) {
		System.out.println("Token: " + JWT.substring(7));
		String got_token = this.addStudent.Get_JWT_From_DB(JWT.substring(7));
		System.out.printf("Token from DB: "+ got_token);
//		System.out.printf("Extraction: " + JWTUtil.extractUsername((String) details.get("Token")) + ", Subject: " + subject);
		 Map<String, String> Returner = new HashMap<>();
//		if((JWTUtil.extractUsername((String) details.get("Token"))).equals(subject)) {
//			String result = this.addStudent.AddStudenttoDB(details);
//			Returner.put("Status", result);
//			return Returner;
//		}
		Returner.put("Status", "Testing JWT in Header!!");
		return Returner;
	}
	
	@PostMapping(path="/Update", consumes="application/json", produces="application/json")
	public Map<String, String> Updateuser(@RequestBody Map<String, String> details){
		Map<String, String> Converter = new HashMap<>();
		String result = this.addStudent.Update_User_Details(details);
		Converter.put("Status", result);
		return Converter;
	}

	@PostMapping(path = "/Welcome", consumes = "application/json", produces = "application/json")
	public ResponseEntity<String> Welcome(@RequestBody Map<String, Object> details) {
		return ResponseEntity.ok("Welcome " + details.get("name") + " To The Spring Boot Post API! \n"
				+ "Your Details Are: \n Age: \n" + details.get("age") + "\n Company: " + details.get("company"));
	}

}
