package SpringBootPro.Demo.Application.model;

public class Signup {
	String Username;
	String Password;
	String Email;
	String First_Name;
	String Last_Name;
	public String getUsername() {
		return Username;
	}
	public void setUsername(String username) {
		Username = username;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public String getFirst_Name() {
		return First_Name;
	}
	public void setFirst_Name(String first_Name) {
		First_Name = first_Name;
	}
	public String getLast_Name() {
		return Last_Name;
	}
	public void setLast_Name(String last_Name) {
		Last_Name = last_Name;
	}
	public Signup(String username, String password, String email, String first_Name, String last_Name) {
		super();
		Username = username;
		Password = password;
		Email = email;
		First_Name = first_Name;
		Last_Name = last_Name;
	}
	public Signup() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Signup [Username=" + Username + ", Password=" + Password + ", Email=" + Email + ", First_Name="
				+ First_Name + ", Last_Name=" + Last_Name + "]";
	}
}
