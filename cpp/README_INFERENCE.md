# C++ inference CLI (simple demo)

This is a small CLI program that reads JSON from stdin and returns a JSON prediction on stdout. It is a placeholder to simulate a high-performance inference engine implemented in C++.

Build (example):
mkdir build && cd build
cmake .. && make

Run (example):
cat input.json | ./era-inference-svc

Notes:
- Replace the internal logic with actual ONNX Runtime C++ calls to load and run a model.
- For production, consider exposing the model via gRPC or REST directly from the C++ service or packaging it as a Docker image.
