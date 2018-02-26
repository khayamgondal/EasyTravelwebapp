<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" import="java.sql.*,javax.sql.*,javax.naming.*,java.util.*"%>

<%


String driver = "org.gjt.mm.mysql.Driver";
String DataSource = "org.apache.derby.jdbc.ClientDataSource";
Class.forName(driver).newInstance();
Connection conn=null;
ResultSet rst=null;
Statement stmt=null;
String textout = "";

try{
	String url="jdbc:mysql://localhost/easytravelling?user=root";
	conn=DriverManager.getConnection(url);
	 stmt = conn.createStatement();
	String latMax = request.getParameter("latMax").toString();
	String latMin = request.getParameter("latMin").toString();
	String lonMax = request.getParameter("lonMax").toString();
	String lonMin = request.getParameter("lonMin").toString();
	//rst=stmt.executeQuery("select * from stops where stop_name like '%" + keyz + "%'");
	String query = "select * from stops where stop_lat >= "+latMin+" and stop_lat <= "+latMax+" and stop_lon >= "+lonMin+" and stop_lon <= "+lonMax+";";
	//console.log(query);
	//out.println(query);	
	// query = "select * from stops";
	rst = stmt.executeQuery(query);
	String result = "";
	//ArrayList<String> result = new ArrayList<String>(); 
	//out.println(rst);
	//int i = 0;
	
	while (rst.next()) {
		String stopName = rst.getString("stop_name");
		String stopLat = rst.getString("stop_lat");
		String stopLon = rst.getString("stop_lon");
		result = result + stopName+"&"+stopLat+"&"+stopLon+"%";
	//	i++;
	}
	out.println(result);

	/*for (int j=0; j <result.length; j++){
	out.println(result[j]+"<b>tt</b></br>");
	
	}*/
}
catch(Exception e){
	System.out.println(e.getMessage());
}


%>