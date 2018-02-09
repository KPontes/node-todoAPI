const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed.js');
var {User} = require('./../models/user.js');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it ('Should create a new todo', (done) => {
    var text = 'Testing todo';
    //test response
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      //if response ok, test the state of the database
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });
  it ('Should NOT create a new todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it ('Should fetch all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});
describe('GET /todos/:id', () => {
  it ('Should return one todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it ('Should return 404 if todo not found', (done) => {
    var hexId = '123'; //new ObjectID().toHexString();
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });
  it ('Should return 404 for non objectIDs', (done) => {
    var hexId = '123abc';
    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it ('Should DELETE a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexId);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(hexId).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });

  it ('Should return 404 if todo not found', (done) => {
    var hexId = '123'; //new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });
  it ('Should return 404 for non objectIDs', (done) => {
    var hexId = '123abc';
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it ('Should Update a todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'Test change item';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text: text, completed: true})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      //if response ok, test the state of the database
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it ('Should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'Test change item';
    request(app)
    .patch(`/todos/${hexId}`)
    .send({text: text, completed: false})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      //if response ok, test the state of the database
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        expect(todos[0].completed).toBe(false);
        expect(todos[0].completedAt).toNotExist();
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /users/me', () => {
  it('Should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token) //set the header title, value
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('Should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('Should create a user', (done) => {
    var email = 'email@text.com';
    var password = '123abc';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        //if response ok, test the state of the database
        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password); // as it should be hashed in the database
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should return validation error if invalid user', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'kri',
        password: '123'
      })
      .expect(400)
      .end(done);
  });

  it('Should not create user if email duplicated', (done) => {
    //try to create a user contained on the seed data
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: '111111'
      })
      .expect(400)
      .end(done);
  });
});
