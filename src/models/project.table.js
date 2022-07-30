class ProjectTable {

    static TableQuery = "CREATE TABLE IF NOT EXISTS Project (projectID ROWID, projectName TEXT, manager TEXT, author TEXT, gitUrl TEXT, projectStack  TEXT, description TEXT)"

}

module.exports = ProjectTable;
