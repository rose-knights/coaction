// Declare our app module, and import the ngRoute and ngAnimate
// modules into it.
var app = angular.module('app', ['ngRoute']);

// Set up our 404 handler
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.otherwise({
    controller: 'Error404Ctrl',
    controllerAs: 'vm',
    templateUrl: 'static/errors/404/error-404.html'
  });
}]);

app.factory('taskService', ['$http', '$log', function($http, $log) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, task) {
    return processAjaxPromise($http.post(url, task));
  }

  function put(url, data) {
    return processAjaxPromise($http.put(url, data));
  }

  function remove(url) {
    return processAjaxPromise($http.delete(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      var data = result.data;
      console.log(data.tasks);
      return data.tasks;
    })
    .catch(function (error) {
      $log.log(error);
      throw error;
    });
  }

  return {
    getTaskList: function () {
      return get('/tasks/');
    },

    getTaskById: function (id) {
      return get('/tasks/' + id);
    },

    addTask: function (task) {
      return post('/tasks/', task);
    },

    removeTask: function (id) {
      return remove('/tasks/' + id);
    },

    updateTask: function (id, data) {
      return put('/tasks/' + id, data);
    }
  };
}]);

app.factory('userService', ['$http', '$log', function ($http, $log) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, data) {
    return processAjaxPromise($http.post(url, data));
  }

  function put(url, data) {
    return processAjaxPromise($http.put(url, data));
  }

  function remove(url) {
    return processAjaxPromise($http.delete(url));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      var data = result.data;
      console.log(data.tasks);
      return data.tasks;
    })
    .catch(function (error) {
      $log.log(error);
      throw error;
    });
  }

  return {
    getUserList: function () {
      return get('/users/');
    },

    getUserById: function (id) {
      return get('/users/' + id);
    },

    loginUser: function (user) {
      console.log(user);
      return post('/login/', user);
    },

    addUser: function (user) {
      return post('/register/', user);
    },

    logoutUser: function () {
      return post('/logout/');
    },

    removeUser: function (id) {
      return remove('/users/' + id);
    },

    updateUser: function (id, data) {
      return put('/users/' + id, data)
    }
  };
}]);

app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/tasks/my-tasks.html',
    controller: 'TaskCtrl',
    controllerAs: 'vm',
    resolve: {
      tasks: ['taskService', function (taskService) {
        return taskService.getTaskList();
      }]
    }
  };

  // $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/my-tasks', routeDefinition);
}])
.controller('TaskCtrl', ['$location', 'tasks', 'taskService', 'userService', function ($location, tasks, taskService, userService) {
  var self = this;

  self.tasks = tasks;

  self.removeTask = function (id) {
    taskService.removeTask(id).then(function () {
      for (var i = 0; i < self.tasks.length; ++i) {
        if (self.tasks[i].id === id) {
          self.tasks.splice(i, 1);
          break;
        }
      }
    }).catch(function () {
      alert('failed to delete');
    })
  }

  self.addTaskPage = function () {
    $location.path('/new-task');
  }

  self.changeStatus = function (task, status) {
    task.status = status;
    taskService.updateTask(task.id, task);
  }

  self.logoutUser = function () {
    alert('fire');
    return userService.logoutUser().then(self.goToLoginPage());
  }

  self.goToLoginPage = function () {
    $location.path('/login');
  }

}]);

app.factory('Task', function () {
  return function (spec) {
    spec = spec || {};
    return {
      title: spec.title,
      description: spec.description,
      status: spec.status,
      createdOn: spec.createdOn,
      dueOn: spec.dueOn
    };
  };
});

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'static/users/register.html',
    controller: 'NewUserCtrl',
    controllerAs: 'vm'
  });
}]).controller('NewUserCtrl', ['$location', 'userService', 'User', function ($location, userService, User) {

  var self = this;
  self.user = User();

  self.addUser = function () {
    console.log(self.user);
    userService.addUser(self.user).then(self.goToTasks());
  }

  self.goToTasks = function () {
    $location.path('/my-tasks');
  }
}]);

app.config(['$routeProvider', function ($routeProvider) {
  var routeDefinition = {
    templateUrl: 'static/users/login.html',
    controller: 'UserCtrl',
    controllerAs: 'vm'
    // resolve: {
    //   users: ['userService', function (userService) {
    //     return userService.getUserList();
    //   }]
    // }
  }

  $routeProvider.when('/', routeDefinition);
  $routeProvider.when('/login', routeDefinition);
}])
.controller('UserCtrl', ['$location', 'userService', 'User', function($location, userService, User){
  var self = this;
  self.user = User();
  // self.users = users;

  self.addUserPage = function () {
    $location.path('/register');
  }

  self.loginUser = function (user) {
    return userService.loginUser(self.user).then(function () {
      return self.goToTasks();
    });
  }

  self.goToTasks = function () {
    $location.path('/my-tasks');
  }
}]);

app.factory('User', function () {
  return function (spec) {
    spec = spec || {};
    return {
      username: spec.username || '',
      password: spec.password || '',
      name: spec.name,
      email: spec.email
    };
  };
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new-task', {
    templateUrl: 'static/new-tasks/new-task.html',
    controller: 'NewTaskCtrl',
    controllerAs: 'vm'
  });
}]).controller('NewTaskCtrl', ['$location', 'taskService', 'Task', function ($location, taskService, Task) {

  var self = this;
  self.task = Task();

  self.addTask = function () {
    taskService.addTask(self.task).then(self.goToTasks);
  }

  self.goToTasks = function () {
    $location.path('/my-tasks');
  }

}]);

app.controller('Error404Ctrl', ['$location', function ($location) {
  var self = this;

  this.message = 'Could not find: ' + $location.url();
  self.goBack = function() {
    location.reload();
  }
}]);

//# sourceMappingURL=app.js.map