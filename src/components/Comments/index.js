import { v4 as uuidv4 } from 'uuid'
import { Component } from 'react'
import CommentItem from '../Message'
import './Comments.css'
import Header from '../Header/Header'
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import React, { createRef } from "react";

class Comments extends Component {
  componentDidMount() {
    this.inputName = React.createRef();
    this.inputComment = React.createRef();
  }

  state = {
    name: '',
    comment: '',
    arrayList: [],
    fields: {},
    errors: {},
    commentBox: []
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Het veld kan niet leeg zijn";
    }

    if (!fields["comment"]) {
      formIsValid = false;
      errors["comment"] = "Het tekstveld kan niet leeg zijn";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  CheckComment = e => {
    e.preventDefault()
    if (!this.handleValidation()) {
      exit
    }
    else {
      const { name, comment } = this.state.fields;
      const firstName = name;
      const d = new Date();
      const date = d.toLocaleString([], {
        timeStyle: "medium",
        hour12: false,
        dateStyle: "short"
      }).replace(/AM|PM/g, "");
      const object = {
        id: uuidv4(),
        firstNames: firstName,
        names: name,
        comments: comment,
        dates: date,
      }
      this.setState(prevState => ({
        arrayList: [...prevState.arrayList, object],
        name: '',
        comment: ''
      }))
    }
  }

  deleteComment = id => {
    const { arrayList } = this.state
    const filteredList = arrayList.filter(eachValue => eachValue.id !== id)
    this.setState({
      arrayList: filteredList
    })
  }

  render() {
    const { arrayList } = this.state;
    return (
      <>
        <Header />
        <div className="main-container" >
          <div className="container">
            <form className="form-container" onSubmit={this.CheckComment}>
              <TextField id="outlined-basic" label="Naam" variant="outlined"
                style={{ marginBottom: "10px" }}
                type="text"
                className="name-field"
                autoFocus
                placeholder="Geef hier je naam in"
                ref={this.inputName}
                onChange={this.handleChange.bind(this, "name")}
                value={this.state.name["name"]} />
              <span style={{ color: "red", fontSize: "14px", paddingBottom: "15px", fontSize: "13px", fontFamily: "Verdana" }}>{this.state.errors["name"]}</span>
              <TextField multiline
                rows={3}
                label="Comment" variant="outlined"
                className="comment-field"
                placeholder="Je comment"
                ref={this.inputComment}
                onChange={this.handleChange.bind(this, "comment")}
                value={this.state.comment["comment"]}
              />
              <span style={{ color: "red", paddingBottom: "20px", paddingTop: "15px", fontSize: "13px", fontFamily: "Verdana" }}>{this.state.errors["comment"]}</span>
              <Button size="lg" type="submit" className="btn">Plaats Comment</Button>
            </form>
          </div>
          <div className="comments-container">
            <div id="comment" className="comment">
              {arrayList.map(eachObject => (
                <CommentItem
                  key={eachObject.id}
                  arrayList={eachObject}
                  deleteComment={this.deleteComment}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Comments
