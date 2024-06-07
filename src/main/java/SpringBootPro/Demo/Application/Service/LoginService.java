package SpringBootPro.Demo.Application.Service;

import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import SpringBootPro.Demo.Application.model.Login;

@Repository
public interface LoginService {
	public List<Login> getLoginData();
	public String AddtokentoDB(String Token, String ID);

}
