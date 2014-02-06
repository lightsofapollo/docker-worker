suite('echo test', function() {
  var amqp = require('../amqp')();
  var worker = require('../worker')();
  var runTask = require('../run_task')(amqp);

  var TaskFactory = require('taskcluster-task-factory/task');

  test('recording of timing details', function() {
    var task = TaskFactory.create({
      command: ['sleep', '1'],
      parameters: {
        docker: { image: 'ubuntu' }
      }
    });

    return runTask(task).then(
      function(taskStatus) {
        assert.ok(taskStatus.claimed);
        console.log(taskStatus.finish);
        var result = taskStatus.finish.result;

        assert.ok(result.times.runtime_seconds > 1, 'runtime seconds');
        assert.equal(result.task_result.exit_status, 0);
      }
    );
  });
});

