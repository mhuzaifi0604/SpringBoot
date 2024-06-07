package SpringBootPro.Demo.Application.DBUtil;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUtils {
	private static Connection connection = null;

	public static Connection getConnection() throws SQLException {
		if (connection != null) {
			return connection;
		} else {
			String Driver = "com.mysql.cj.jdbc.Driver";
			String URL = "jdbc:mysql://localhost:6969/Springboot?useSSL=false";
			String user = "root";
			String password = "20i0604";
			try {
				Class.forName(Driver);
				connection = DriverManager.getConnection(URL, user, password);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return connection;
	}
}
