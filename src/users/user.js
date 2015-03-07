app.factory('User', function () {
  return function (spec) {
    spec = spec || {};
    return {
      username: spec.username,
      password: spec.password,
      name: spec.name,
      email: spec.email
    };
  };
});
