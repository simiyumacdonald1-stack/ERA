cmake_minimum_required(VERSION 3.10)
project(era_inference_svc)

set(CMAKE_CXX_STANDARD 17)

# Use nlohmann_json from package manager if available; otherwise user should install it
find_package(nlohmann_json QUIET)

add_executable(era-inference-svc main.cpp)
if (TARGET nlohmann_json::nlohmann_json)
  target_link_libraries(era-inference-svc PRIVATE nlohmann_json::nlohmann_json)
endif()
