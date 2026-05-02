// Minimal gRPC server skeleton (placeholder). This file assumes generated protobuf/grpc sources exist.
// Replace with a full implementation that loads ONNX models via ONNX Runtime and returns real predictions.

#include <iostream>
#include <memory>
#include <string>

#include <grpcpp/grpcpp.h>
#include "predict.grpc.pb.h"

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;
using era::PredictRequest;
using era::PredictResponse;
using era::Predictor;

class PredictorServiceImpl final : public Predictor::Service {
  Status Predict(ServerContext* context, const PredictRequest* request, PredictResponse* reply) override {
    // Simple mock logic: if features["teamAForm"] > features["teamBForm"] then favor A
    double a = 0.5, b = 0.5;
    if (request->features().count("teamAForm")) a += request->features().at("teamAForm") * 0.2;
    if (request->features().count("teamBForm")) b += request->features().at("teamBForm") * 0.2;
    double sum = a + b;
    reply->set_win_prob_a(a / sum);
    reply->set_win_prob_b(b / sum);
    reply->set_explanation("Mock gRPC prediction from ERA gRPC server (replace with ONNX inference)");
    return Status::OK;
  }
};

void RunServer() {
  std::string server_address("0.0.0.0:50051");
  PredictorServiceImpl service;

  ServerBuilder builder;
  builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
  builder.RegisterService(&service);
  std::unique_ptr<Server> server(builder.BuildAndStart());
  std::cout << "gRPC server listening on " << server_address << std::endl;
  server->Wait();
}

int main(int argc, char** argv) {
  RunServer();
  return 0;
}
