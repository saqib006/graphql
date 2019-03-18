import React, { Component } from 'react'
import {graphql, compose} from 'react-apollo'
import {addBookMutation, getAuthorsQuery, getBooksQuery} from '../queries/queries'

class AddBook extends Component {
    constructor(props){
        super(props)
        console.log('authors',props)

        this.state = {
            name:'',
            genre:'',
            authorId:''
        }
    }

    
    

    displayAuthors(){
        let data = this.props.getAuthorsQuery
        if(data.loading){
            return (<div>Loading Books</div>)
        }
        else{
            return data.authors.map(author=>{
                return(<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    submitAuthor = (eve) => {
        eve.preventDefault()
        let {name, genre, authorId} = this.state
        this.props.addBookMutation({
            variables:{
                name:name,
                genre:genre,
                authorId:authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        })
        console.log(this.state)
    }
  render() {
      
    return (
      <div>
        <form onSubmit={this.submitAuthor}>
            <div>
                <label>Name</label>
                <input type="text" value={this.state.name} onChange={e => this.setState({name:e.target.value})}/>
            </div>
            <div>
                <label>Genre</label>
                <input type="text" value={this.state.genre} onChange={e => this.setState({genre:e.target.value})}/>
            </div>
            <div>
                <label>Author</label>
                <select value={this.state.authorId}  onChange={e => this.setState({authorId:e.target.value})}>
                    <option>Select Author</option>
                    {this.displayAuthors()}
                </select>
            </div>
            <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook)