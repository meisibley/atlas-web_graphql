import { getProjectsQuery, addProjectMutation } from '../queries/queries';
import { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose } from 'lodash';

class AddProject extends Component {
  constructor(props) {
      super(props);
      this.state = {
          title: '',
          weight: 0,
          description: '',
      }
  };

  submitForm(e){
    e.preventDefault();
    this.props.addProjectMutation({
        variables:{
            title: this.state.title,
            weight: this.state.weight,
            description: this.state.description,
        },
        refetchQueries:[{query: getProjectsQuery}]
    });
  }

  render() {
    return (
      <form className="project" id="add-project" onSubmit={this.submitForm.bind(this)}>
        <div className = "field" >
          <label> Project title: </label>
          <input type="text" name="title" onChange={(e) => this.setState({title:e.target.value})} required/>
        </div>
        <div className = "field">
          <label> Weight: </label>
          <input type="number" name="weight" onChange={(e) => this.setState({weight:Number(e.target.value)})} required/>
        </div>
        <div className="field">
          <label> description: </label><textarea name="description" onChange={(e) => this.setState({description:e.target.value})} required/>
        </div>
        <button> + </button>
      </form>
    );
  }
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addProjectMutation, { name: "addProjectMutation" })
)(AddProject);
