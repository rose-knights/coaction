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
    // .catch(function (error) {
    //   $log.log(error);
    //   throw error;
    // });
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
      return post('/login/', { username: 'testusername', password: 'test' });
    },

    addUser: function (user) {
      return post('/register/', user)
    },

    logoutUser: function (user) {
      return post('/logout/', user)
    },

    removeUser: function (id) {
      return remove('/users/' + id);
    },

    updateUser: function (id, data) {
      return put('/users/' + id, data)
    }
  };
}]);
