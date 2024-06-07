package SpringBootPro.Demo.Application.Service;

import java.sql.ResultSet;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface AddStudent {
	public String AddStudenttoDB(Map<String, Object> Details);
	public String Update_User_Details(Map<String, String> Details);
}
