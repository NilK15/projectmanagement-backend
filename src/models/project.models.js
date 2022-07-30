class Project {



    constructor(id, projectName, manager, author, gitUrl, projectStack, description) {
        this.id = id;
        this.projectName = projectName;
        this.manager = manager;
        this.author = author;
        this.gitUrl = gitUrl;
        this.projectStack = projectStack;
        this.description = description;
    }
}

module.exports = Project
