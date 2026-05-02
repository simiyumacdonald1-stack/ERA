#include <iostream>
#include <string>
#include <sstream>
#include <nlohmann/json.hpp>

// Simple C++ inference CLI demo. Reads JSON from stdin and writes JSON to stdout.
// Uses nlohmann::json (https://github.com/nlohmann/json). For the demo we avoid heavy deps and parse minimally.

int main() {
  try {
    // Read stdin into a string
    std::ostringstream buf;
    buf << std::cin.rdbuf();
    std::string input = buf.str();

    // If input is empty, just return a demo JSON
    if (input.empty()) {
      nlohmann::json out = {
        {"prediction", { {"winProbabilityA", 0.55}, {"winProbabilityB", 0.45} }},
        {"features", { {"recentForm", 0.7}, {"pitchFactor", 0.4} }}
      };
      std::cout << out.dump() << std::endl;
      return 0;
    }

    // Try to parse input JSON (best-effort)
    auto j = nlohmann::json::parse(input);

    // Simple deterministic mock: if teamA has last5Avg > teamB, favor A
    double teamA = 0.5, teamB = 0.5;
    if (j.contains("teamAForm")) teamA += j["teamAForm"].get<double>() * 0.2;
    if (j.contains("teamBForm")) teamB += j["teamBForm"].get<double>() * 0.2;

    double sum = teamA + teamB;
    double pA = teamA / sum;
    double pB = teamB / sum;

    nlohmann::json out = {
      {"prediction", { {"winProbabilityA", pA}, {"winProbabilityB", pB} }},
      {"features", { {"teamAForm", teamA}, {"teamBForm", teamB} }}
    };

    std::cout << out.dump() << std::endl;
    return 0;
  } catch (const std::exception &e) {
    nlohmann::json err = { {"error", std::string("inference error: ") + e.what()} };
    std::cout << err.dump() << std::endl;
    return 1;
  }
}
