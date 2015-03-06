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
