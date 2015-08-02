var Comment = React.createClass({
  render: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      text: ''
    }
  },
  updateField(field, e) {
    var state = {};
    state[field] = e.target.value;
    this.setState(state);
  },
  handleSubmit(e){
    e.preventDefault();
    this.props.onPost({
      author:this.state.name,
      text:this.state.text
    });
    this.setState({
      name:'',
      text:''
    });
  },
  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input placeholder="Your name" value={this.state.name} onChange={this.updateField.bind(this, 'name')}/>
        <input placeholder="Say something..."
          value={this.state.text} onChange={this.updateField.bind(this, 'text')}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var database=[
  {
    author: '作者 1',
    text: '评论 1,' + Date.now()
  },
  {
    author: '作者 2',
    text: ' *评论 2,' + Date.now() + '* '
  }
];

var CommentBox = React.createClass({
  loadCommentsFromServer: function () {
    var self = this;
    $.ajax({
      url: this.props.url,
      method:'post',
      dataType:'json',
      data: {
        json:JSON.stringify({
          data:database
        })
      },
      success(res) {
        self.setState({data: res.data})
      }
    });
  },
  getInitialState: function () {
    return {data: []};
  },
  handlePost(post){
    database.push(post);
    this.loadCommentsFromServer();
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onPost={this.handlePost}/>
      </div>
    );
  }
});



React.render(
  <CommentBox url="/echo/json/" />,
  document.getElementById('container')
);