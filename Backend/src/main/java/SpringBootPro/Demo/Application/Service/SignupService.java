package SpringBootPro.Demo.Application.Service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import SpringBootPro.Demo.Application.model.Signup;

@Repository
public interface SignupService {
	
	public String getUserDetails(Map<String, Object> Details);

}
