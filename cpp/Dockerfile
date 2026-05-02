# Dockerfile for the C++ gRPC inference service (placeholder)
# This image is a starting point. For production, pin versions and install the correct ONNX / gRPC runtime packages.

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential cmake git libssl-dev pkg-config \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

# Build steps (assumes CMakeLists and source are present)
RUN mkdir -p build && cd build && cmake .. && make -j$(nproc)

EXPOSE 50051
CMD ["/app/build/era-grpc-server"]
