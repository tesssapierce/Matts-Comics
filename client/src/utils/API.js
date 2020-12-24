import axios from "axios";

export default {
  // Gets all of matt's comics
  getMattsComics: function () {
    return axios.get("/api/mattscomics");
  },
  // Add a new volume
  addSeries: function (series) {
    return axios.post("/api/mattscomics", series)
  },
  // Add a new issue
  addIssue: function (id, newIssue) {
    return axios.put("/api/mattscomics/" + id + "/" + newIssue);
  },
  deleteSeries: function(id) {
    return axios.delete("/api/mattscomics/" + id);
  },
};
