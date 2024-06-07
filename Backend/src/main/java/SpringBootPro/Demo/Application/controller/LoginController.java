package SpringBootPro.Demo.Application.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
public class LoginController {

	@Autowired
	private LoginService login_service;
	
	@Autowired
	private SignupService signup_service;
	
	@Autowired
	private AddStudent addStudent;

	@PostMapping(path = "/Login", consumes = "application/json", produces="application/json")
	public Map<String, String> GetLoginCreds(@RequestBody Map<String, Object> Creds) {
		System.out.println(Creds.get("username") + " & " + Creds.get("password"));
		 List<Login> data = this.login_service.getLoginData();
		 System.out.println("Data: " +  data);
		 Map<String, String> Converter = new HashMap<>();
		 for (Login login : data) {
			    if (login.getUsername().equals(Creds.get("username")) && login.getPassword().equals(Creds.get("password"))) {
			        System.out.println("Found matching credentials: " + login);
			        String Token = JWTUtil.generateToken(login.getId());
			        String result = this.login_service.AddtokentoDB(Token, login.getId());
			        System.out.printf("Token Addition: " + result);
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
		Map<String, String> Returner = new HashMap<>();
		String TokenFromDB = login_service.getTokenFromDB(JWTUtil.extractUsername(JWT.substring(7)));
		if(TokenFromDB.equals(JWT.substring(7))) {
			System.out.printf("\nTokens Matched");
			if(JWTUtil.extractUsername(TokenFromDB).equals(JWTUtil.extractUsername(JWT.substring(7)))){
				System.out.printf("\nToken IDs Matched!!");
				String result = this.addStudent.AddStudenttoDB(details);
				Returner.put("Status", result);
				return Returner;
			}
		}
		Returner.put("Status", "Validation Unsuccessful!!");
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
