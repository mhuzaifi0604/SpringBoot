package SpringBootPro.Demo.Application.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.hibernate.sql.results.jdbc.internal.ResultSetAccess;
import org.springframework.jdbc.core.PreparedStatementCallback;
import org.springframework.stereotype.Service;

import SpringBootPro.Demo.Application.DBUtil.DBUtils;

@Service
public class AddStudentImpl implements AddStudent{
	
	Connection connection;

	public AddStudentImpl() throws SQLException {
		connection = DBUtils.getConnection();
	}
	
	@Override
	public String AddStudenttoDB(Map<String, Object> details) {
	    try {
	        PreparedStatement statement = connection.prepareStatement(
	                "INSERT INTO Students (student, class, grade) VALUES (?, ?, ?)"
	        );
	        statement.setString(1, (String) details.get("student"));
	        statement.setString(2, (String) details.get("class"));
	        statement.setString(3, (String) details.get("grade"));

	        int result = statement.executeUpdate();
	        return "Student Added Successfully!";
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return null;
	}
	
	@Override
	public String Update_User_Details(Map<String, String> Details) {
		try {
			PreparedStatement statement = connection.prepareStatement(
				    "UPDATE Users SET " + Details.get("to_update") + " = ?, Updated_AT = NOW() WHERE " + Details.get("check") + "= ?"
				);
				statement.setString(1, Details.get("value"));
				statement.setString(2, Details.get("value2"));
			
			int result = statement.executeUpdate();
			return result == 1 ? "Details Updated Successfully!!" : "Something Went Wrong!!";
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
