// Node gRPC client to call the C++ gRPC predictor service (uses @grpc/grpc-js and @grpc/proto-loader)
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const PROTO_PATH = path.join(__dirname, '..', '..', 'proto', 'predict.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true })
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition).era

const client = new protoDescriptor.Predictor('localhost:50051', grpc.credentials.createInsecure())

function callPredict(matchId, features, cb) {
  const req = { match_id: matchId, features }
  client.Predict(req, (err, resp) => {
    if (err) return cb(err)
    cb(null, resp)
  })
}

module.exports = { callPredict }
