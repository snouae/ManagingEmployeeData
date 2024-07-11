#Employee Management Backend
This project is a backend service for managing employees, built with .NET 8 and using SQLite as the database. The service provides CRUD operations for employee data.

#Prerequisites
.NET 8 SDK: Download and install .NET 8 SDK
SQLite: SQLite is embedded within the .NET SDK, so no separate installation is required.

#Project Structure
The main folders and files in the project are as follows:

Controllers: Contains API controllers to handle HTTP requests.
Models: Defines the data models used in the application.
Data: Contains the DbContext and database configurations.
Migrations: Stores migration files generated by Entity Framework Core.

#Detailed Explanation
#Models
The Employee model represents the employee entity in the database. It includes properties such as Id, FirstName, LastName, Email, PhoneNumber, Position, and Department.

#Data Context
The EmployeeContext class inherits from DbContext and configures the database connection. It also includes a DbSet<Employee> to manage employee records.

```
public class EmployeeContext : DbContext
{
    public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options) { }

    public DbSet<Employee> Employees { get; set; }
}
```

#Migrations
Migrations are used to create and update the database schema. The initial migration is created with the command:
```
dotnet ef migrations add InitialCreate
```
This generates a migration file in the Migrations folder, which is then applied to the database using:
```
dotnet ef database update
```

#Controllers
The EmployeesController handles HTTP requests for employee data. It includes actions for retrieving, creating, updating, and deleting employees.

#Running Tests
To run the tests for the backend service, use the following command:
```
dotnet test
```
#Troubleshooting
EF Tools Not Found: Ensure the EF Core tools are installed globally using dotnet tool install --global dotnet-ef.
Database Connection Issues: Check the connection string in appsettings.json to ensure it points to the correct SQLite database file.




