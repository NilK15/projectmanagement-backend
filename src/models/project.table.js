// Project table definition
class ProjectTable {
    // Query to create a project table to hold projects
    static TableQuery = 'CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY, projectName, manager, author, gitUrl, projectStack, description)';
}

module.exports = ProjectTable;
