class ProjectTable {
    static TableQuery = 'CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY, projectName, manager, author, gitUrl, projectStack, description)';
}
module.exports = ProjectTable;
