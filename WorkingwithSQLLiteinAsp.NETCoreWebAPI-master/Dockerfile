# Use the .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /WorkingwithSQLLiteinAsp.NETCoreWebAPI-master

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Use the .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /WorkingwithSQLLiteinAsp.NETCoreWebAPI-master

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code and build the app
COPY . ./
RUN dotnet publish -c Release -o /WorkingwithSQLLiteinAsp.NETCoreWebAPI-master/bin/Release/net7.0/publish

# Use the .NET runtime image for the final container
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /WorkingwithSQLLiteinAsp.NETCoreWebAPI-master

# Copy the published files from the build stage
COPY --from=build /WorkingwithSQLLiteinAsp.NETCoreWebAPI-master/bin/Release/net7.0/publish ./

# Copy the published files from the build stage
COPY --from=build /WorkingwithSQLLiteinAsp.NETCoreWebAPI-master/SQLLiteDatabase.db ./

# Expose the application ports
EXPOSE 5000
EXPOSE 5001

# Set the entry point for the application
ENTRYPOINT ["dotnet", "TaskManagerAPI.dll"]
