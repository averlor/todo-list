import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nextTodoText: "",
    todos: [
      {
        id: 1,
        title: "First",
        completed: false,
        tasks: [
          {
            id: 2,
            titleTask: "First sub",
            completedTask: false
          }
        ]
      },
      {
        id: 3,
        title: "Second",
        completed: false,
        tasks: [
          {
            id: 4,
            titleTask: "Second sub",
            completedTask: false
          }
        ]
      }
    ]
  },
  computed: {
    capitalizeText() {
      return (
        this.$store.state.nextTodoText.charAt().toUpperCase() +
        this.$store.state.nextTodoText.slice(1)
      );
    },
    getTasks() {
      return this.$store.state.todos.map(todo => todo.tasks);
    }
  },
  getters: {
    GetTodoText: state => {
      return state.nextTodoText;
    },
    GetTodos: state => {
      return state.todos;
    },
    GetTodosCount: state => {
      return state.todos.filter(todo => todo.completed == false).length;
    },
    // Передать title
    GetTodoTask: state => title => {
      return state.todos.find(todo => todo.title === title)["tasks"];
    },
    // not work
    CompletedTask: (state, title) => {
      return this.$getters
        .GetTodoTask(title)
        .filter(task => task.completedTask === true).length;
    },
    PendingTask: (state, title) => {
      return this.$getters.GetTodoTask(title).filter(task => task.completedTask == false)
        .length;
    }
  },
  mutations: {
    updateMessage(state, value) {
      state.nextTodoText = value;
    },
    addTodo(state, payload) {
      if (payload.title) {
        state.todos.push({
          id: Date.now(),
          title: payload.title,
          completed: false,
          tasks: []
        });
      }
    },
    removeTodo(state, todo) {
      return state.todos.splice(state.todos.indexOf(todo), 1);
    },
    editTodo(state, payload) {
      return state.todos.map(todo => {
        if (todo.id === payload.id) {
          todo.title = payload.title;
        }
        return todo;
      });
    },
    removeAllTodo(state) {
      return (state.todos = []);
    },
    addTask(state, payload) {
      if (payload.title) {
        return state.todos.map(todo => {
          if (todo.title === payload.titleGroup) {
            todo.tasks.push({
              id: Date.now(),
              titleTask: payload.title,
              completedTask: false
            });
          }
          return todo;
        });
      }
    },
    editTask(state, payload) {
      // ??
      return state.todos.map(todo => {
        if (todo.title === payload.titleGroup) {
          todo.tasks.map(task => task.titleTask = payload.title)
        }
        return todo;
      });
    },
    // edit!!
    completedTask(state, payload) {
      return state.todos.map(todo => {
        if (todo.title === payload.titleGroup) {
          todo.tasks[0].completedTask = !todo.tasks[0].completedTask
        }
        return todo;
      });
    },
    // ???
    removeTask(state, todo) {
      return state.todos.splice(state.todos.indexOf(todo), 1);
    },
    removeAllTask(state, payload) {
      return state.todos.map(todo => {
        if (todo.title === payload.titleGroup) {
          todo.tasks = []
        }
        return todo
      })
    }
  },
  actions: {}
});
