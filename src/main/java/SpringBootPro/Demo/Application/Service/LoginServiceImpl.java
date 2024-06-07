package SpringBootPro.Demo.Application.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.stereotype.Service;

import SpringBootPro.Demo.Application.DBUtil.DBUtils;
import SpringBootPro.Demo.Application.model.Login;
import ch.qos.logback.core.spi.ScanException;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	static List<Login> LoginData = new ArrayList();

	Connection connection;

	public LoginServiceImpl() throws SQLException {
		connection = DBUtils.getConnection();
	}

	@Override
	public List<Login> getLoginData() {
		try {
			PreparedStatement statement = connection.prepareStatement("Select * From Users");
			ResultSet result = statement.executeQuery();
			System.out.println("Result: " + result);
			while (result.next()) {
				Login login = new Login();
				login.setId(result.getString(1));
				login.setUsername(result.getString(2));
				login.setPassword(result.getString(3));
				LoginData.add(login);
			}
			return LoginData;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}
	
	@Override
	public String AddtokentoDB(String Token, String ID) {
		try {
			PreparedStatement statement = connection.prepareStatement(
			"Update Users Set JWT = ? Where ID = ?"		
			);
			statement.setString(1, Token);
			statement.setString(2, ID);
			int result = statement.executeUpdate();
			return "Token Added To DB";
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

}
