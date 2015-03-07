app.factory('userService', ['$http', '$log', 'taskService', function ($http, $log, taskService) {

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
    getUserList: function () {
      return get('/users/');
    },

    getUserById: function (id) {
      return get('/users/' + id);
    },

    loginUser: function (user) {
      return post('/login/', user);
    },

    removeUser: function (id) {
      return remove('/users/' + id);
    },

    updateUser: function (id, data) {
      return put('/users/' + id, data)
    }
  };
}]);
