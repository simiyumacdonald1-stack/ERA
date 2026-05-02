# Add script notes for backend to call gRPC service
When the gRPC service is running on localhost:50051, backend code can use backend/grpc_client.js to call Predict.

Example usage (in backend route):

const { callPredict } = require('./grpc_client')
callPredict('match1', { teamAForm: 0.6, teamBForm: 0.4 }, (err, resp) => {
  if (err) return res.status(500).json({ error: 'prediction failed' })
  return res.json(resp)
})
