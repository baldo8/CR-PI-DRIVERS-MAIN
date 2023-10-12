function teamsU(string) {
    if (string.length === 0) {
      return [];
    }
    return string.split(",").map((e) => e.trim());
  }
  
  module.exports = {teamsU}