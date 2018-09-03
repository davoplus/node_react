import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';
import Blog from './Blog/Blog';
import NewBlog from './Blog/NewBlog';
import UpdateBlog from './Blog/UpdateBlog';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class App extends Component {
  state = {
    persons:  [],
    blogs : blogs,
    showModal : false,
    showUpdateModal : false,
    inputTitle : "",
    inputDescription : "",
    inputId:""
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleOpenUpdateModal = () => {
    this.setState({ showUpdateModal: true });
  }
  
  handleCloseUpdateModal = () => {
    this.setState({ showUpdateModal: false });
  }


  openUpdateModal = (e,data) => {
    console.log('openUpdateModal');
    console.log(data);
    this.setState({ inputTitle: data.title,
                    inputDescription: data.description,
                    inputId: data.blogId
                   });
    this.handleOpenUpdateModal();
  }


  updateTitle = (e) => {
    this.setState({inputTitle: e.target.value}); 
  }

  updateDescription = (e) => {
    this.setState({inputDescription: e.target.value}); 
  }

  getBlogs = () => {
    console.log('buscar Blogs! ');
    var url = 'http://localhost:8080/blog';

    fetch(url)
      .then(  function(response) {
                if (response.ok){
                  response.json().then( function(body){
                                          this.setState({ blogs: body });
                                        }.bind(this));  
                } else {
                  this.setState({ blogs: [] });
                }
              }.bind(this) );
 
  }


  postBlog = (e) => {
    console.log('guardar Blog! ');
    var url = 'http://localhost:8080/blog';

    let jsonBlog = {
      titulo: this.state.inputTitle,
      contenido: this.state.inputDescription
    };

    fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(jsonBlog), // body data type must match "Content-Type" header
      })
      .then(  function(response) {
                if (response.ok){
                  response.json().then( function(body){
                                        this.handleCloseModal();
                                        this.getBlogs();
                                        }.bind(this));  
                } else {
                  this.setState({ blogs: [] });
                }
              }.bind(this) );
 
  }


  putBlog = (e,data) => {
    console.log('actualizar Blog! ');
    var url = 'http://localhost:8080/blog';

    let jsonBlog = {
      id:data,
      titulo: this.state.inputTitle,
      contenido: this.state.inputDescription
    };

    fetch(url, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(jsonBlog), // body data type must match "Content-Type" header
      })
      .then(  function(response) {
                if (response.ok){
                  response.json().then( function(body){
                                        this.handleCloseUpdateModal();
                                        this.getBlogs();
                                        }.bind(this));  
                } else {
                  this.setState({ blogs: [] });
                }
              }.bind(this) );
 
  }

  deleteBlog = (e,data) => {
    console.log('borrar Blog! ');
    var url = 'http://localhost:8080/blog/'+data;

    

    fetch(url, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer" // no-referrer, *client          
      })
      .then(  function(response) {
                if (response.ok){
                  this.getBlogs();                                         
                } else {
                  this.setState({ blogs: [] });
                }
              }.bind(this) );
 
  }

  defaultBlogs = () => {
    console.log('default Blogs! ');
    this.setState({ blogs: blogs }); 
 
  }

  switchNameHandler = (newTitle) => {
    console.log('hice click! '+newTitle); 
  }

  nameChangeHandler = (event) => {
    console.log('cambie el texto!');
  }


  render() {

    const style = {
      backgroundColor: 'red',
      border: '1px solid blue',
      padding: '8px' ,
      cursor: 'pointer'
    }

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Hello from reac app.js</h1>

        
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Crear un nuevo Blog"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          <NewBlog  click={this.postBlog} 
                    titleChange={this.updateTitle} 
                    descriptionChange={this.updateDescription}
                    >
          </NewBlog>
        </Modal>

        <Modal 
           isOpen={this.state.showUpdateModal}
           contentLabel="Actualizar un Blog"
        >
          <button onClick={this.handleCloseUpdateModal}>Close Modal</button>
          <UpdateBlog  click={this.putBlog} 
                    titleChange={this.updateTitle} 
                    descriptionChange={this.updateDescription}
                    blogId={this.state.inputId} 
                    title={this.state.inputTitle} 
                    description={this.state.inputDescription}
                    >
          </UpdateBlog>
        </Modal>
        
        { this.state.persons.map(
            function(person){
              return <Person key={person.key} title={person.title} description={person.description} changed={e => this.nameChangeHandler} />
            }  
          )
        }

        { this.state.blogs.map(
            function(blog){
              return <Blog  key={blog.id} 
                            blogId={blog.id} 
                            title={blog.titulo} 
                            description={blog.contenido}                             
                            deleteBlog={this.deleteBlog}
                            changed={this.nameChangeHandler} 
                            openUpdateModal={this.openUpdateModal} />
            }.bind(this)  
          )
        }
        <div>
          <button onClick={this.handleOpenModal}>Crear Blog</button>
          <button onClick={this.getBlogs}>Get Blogs</button>
          <button onClick={this.defaultBlogs} style={style} >Default Blogs</button>
        </div>
      </div>
    );

    //return React.createElement('div',{className : 'App'},React.createElement('h1',null,'Render from create Element'),'out of h1');
  }
}

var blogs = [];
//var blogs = [{"id":10,"titulo":"Titulo 10 Java","contenido":"Contenido Java"},{"id":20,"titulo":"Titulo 20 Spring","contenido":"Contenido Spring"},{"id":30,"titulo":"Titulo 30  Spring boot","contenido":"Contenido Spring boot"},{"id":40,"titulo":"Titulo 40 Eclipse","contenido":"Contenido eclipse"}];
export default App;
