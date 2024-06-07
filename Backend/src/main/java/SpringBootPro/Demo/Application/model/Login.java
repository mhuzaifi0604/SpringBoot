package SpringBootPro.Demo.Application.model;

public class Login {
	String Username;
	String Password;
	String id;

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

	public String getId() {
		return id;
	}
	
	public void setId(String Id) {
		id = Id;
	}
	public Login(String username, String password, String ID) {
		super();
		Username = username;
		Password = password;
		id = ID;
	}

	public Login() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Login [Username=" + Username + ", Password=" + Password + "]";
	}

}
