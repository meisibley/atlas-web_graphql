import { gql } from 'apollo-boost';

const getProjectsQuery = gql`
  {
    projects {
      id
      title
    }
  }
`
const getTasksQuery = gql`
  {
    tasks {
      id
      title
      weight
      description
      projectId
    }
  }
`
// add a project using the mutation
const addTaskMutation = gql`
    mutation($title: String!, $weight: Int!, $description: String!, $projectId: ID!){
        addTask(title: $title, weight: $weight, description: $description, projectId: $projectId){
            title
            weight
            id
            description
            projectId
        }
    }
`
const addProjectMutation = gql`
    mutation($title: String!, $weight: Int!, $description: String!){
        addProject(title: $title, weight: $weight, description: $description){
            title
            weight
            id
            description
        }
    }
`
const getTaskQuery = gql`
  query($id: ID) {
    task(id:$id) {
      id
      title
      weight
      description
      project{
        id
        title
        weight
        description
        tasks{
          title
          id
          weight
        }
      }
    }
  }
`
const getTaskDetailQuery = gql`
  query($id: ID) {
    task(id:$id) {
      id
      title
      weight
      description
      project{
        id
        title
        weight
        description
        tasks{
          id
          title
          weight
        }
      }
    }
  }
`
export {getProjectsQuery, getTasksQuery, addTaskMutation, getTaskQuery, addProjectMutation, getTaskDetailQuery};
