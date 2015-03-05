app.factory('taskService', ['$http', '$log', function($http, $log) {

  function get(url) {
    return processAjaxPromise($http.get(url));
  }

  function post(url, task) {
    return processAjaxPromise($http.post(url, task));
  }

  function processAjaxPromise(p) {
    return p.then(function (result) {
      return result.data;
    })
    .catch(function (error) {
      $log.log(error);
    });
  }

  return {
    getTaskList: function () {
      return get('/tasks');
    },

    getTaskById: function (id) {
      return get('/tasks/' + id);
    },

    addTask: function (task) {
      return post('/tasks', task);
    }
  }
}]);
