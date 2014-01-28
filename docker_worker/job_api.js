var Promise = require('promise');
var request = require('superagent-promise');

function JobAPI(options) {
  this.job = options.job;
  this.claim = options.claim;
  this.finish = options.finish;
}

JobAPI.prototype = {
  /**
  Full job definition of this request.

  @type Object
  */
  job: null,

  /**
  Claim URL to accept the task.

  @type String
  */
  claim: null,

  /**
  Finish URL to send the response to.

  @type String
  */
  finish: null,

  /**
  Send a claim to the requester.

  @return Promise
  */
  sendClaim: function() {
    // post with no content
    return request('POST', this.claim).end();
  },

  /**
  Send the finalized version of the job to the requester.

  @return Promise
  */
  sendFinish: function(result) {
    var job = {};

    // don't mutate state of this object. Copy the properties over and send
    // the result
    for (var key in this.job) {
      job[key] = this.job[key];
    }

    job.result = result;

    // post with no content
    return request('POST', this.finish)
      .send(job)
      .end();
  }
};

module.exports = JobAPI;