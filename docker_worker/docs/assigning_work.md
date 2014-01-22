# Work Assignment

To assign work add an amqp message to the queue the worker is listening
on.

For example:

```js
{
  // usual task definition as defined by the rest of task cluster
  task: Task,

  // location where worker can claim the job
  claim: { url: 'http://...' },

  // location where to issue heartbeats
  heartbeat: { url: '' },

  // location where worker can send the results
  complete: { url: '' }
}
```

## Strategy

### Terminology

  - task definition: the task definition as defined by task cluster
  - message: an amqp message
  - ack: an amqp ack
  - nack: an amqp nack
  
### Steps

In the case where the worker is able to work on the task:

  - worker will issue a claim to the url ( additional information may be
    passed to the "claim" url via the POST body )
    
      - a. on a successful response the message will be ack'ed.

      - b. on a unsuccessful response the message will be nack'ed (after
           retries). Abort the next steps.

  - worker will issue first heartbeat and continue to send heartbeats
    until completion.

  - task occurs (this is very specific to the particular
    task)

  - task definition (with result) is sent to the "complete" url.
