<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="java.sql.*,javax.sql.*,javax.naming.*"%>

<%
String driver = "org.gjt.mm.mysql.Driver";
String DataSource = "org.apache.derby.jdbc.ClientDataSource";
Class.forName(driver).newInstance();

Connection conn=null;
ResultSet rst=null;
Statement stmt=null;
String textout = "";

try{
/*	Context ctx = new InitialContext();
	DataSource ds = (DataSource)ctx.lookup("java:comp/env/jdbc/easytravelling");
	 conn = ds.getConnection();*/
	
	String url="jdbc:mysql://localhost/easytravelling?user=root";
	conn=DriverManager.getConnection(url);
	 stmt = conn.createStatement();
	
	String keyz = request.getParameter("keyz").toString();
	rst=stmt.executeQuery("select * from stops where stop_name like '%" + keyz + "%'");
	
	
	while (rst.next()) {
		System.out.println(rst.next());
	String stopName = rst.getString("stop_name");
	String stopLat = rst.getString("stop_lat");
	String stopLon = rst.getString("stop_lon");
	 textout  = textout + "<table><tr style=\"border: 0px solid black\">"+
	        "<td style=\"border: 0px solid black;"+
	             " padding: 0px 10px 0px 10px\">"+
	         "<a href=\"javascript:loadrecord('"+stopName+"','"+stopLat+"','"+stopLon+"')\">"+
	         stopName+"</a></td>"+
	       "</tr></table>";
	}
	
	
}
catch(Exception e){
	System.out.println(e.getMessage());
}

out.println(textout);
%>
