# Minimal CMake for gRPC-based C++ server (placeholder)
cmake_minimum_required(VERSION 3.10)
project(era_inference_grpc)

set(CMAKE_CXX_STANDARD 17)

find_package(Protobuf REQUIRED)
find_package(gRPC CONFIG REQUIRED)

include_directories(${Protobuf_INCLUDE_DIRS})

add_executable(era-grpc-server server.cpp predict.pb.cc predict.grpc.pb.cc)
target_link_libraries(era-grpc-server grpc++ protobuf::libprotobuf)
