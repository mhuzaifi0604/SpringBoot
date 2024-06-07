package SpringBootPro.Demo.Application.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import SpringBootPro.Demo.Application.DBUtil.DBUtils;
import SpringBootPro.Demo.Application.model.Login;
import SpringBootPro.Demo.Application.model.Signup;

@Service
public class SignupServiceImpl implements SignupService{
	@Autowired
	static List<Signup> SignupData = new ArrayList();

	Connection connection;

	public SignupServiceImpl() throws SQLException {
		connection = DBUtils.getConnection();
	}

	@Override
	public String getUserDetails(Map<String, Object> Details) {
		try {
			Signup signup = new Signup();
			System.out.println(Details.get("username") + ", " + Details.get("password") + ", " + Details.get("First_name") + ", " + Details.get("Last_name") + ", " + Details.get("email"));
			PreparedStatement statement = connection.prepareStatement(
				    "INSERT INTO Users(username, pass, first_name, last_name, email, Created_At, Updated_At, JWT) VALUES ('" +
				    Details.get("username") + "','" +
				    Details.get("password") + "','" +
				    Details.get("First_name") + "','" +
				    Details.get("Last_name") + "','" +
				    Details.get("email") + "', Now(), Now(), null);"
				);
			int result = statement.executeUpdate();
			System.out.println("Query Executed: " + result);
			return "User Signed Up Successfully";
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}


}
