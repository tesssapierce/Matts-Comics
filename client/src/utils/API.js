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
  addIssue: function (volume, id) {
    return axios.post("/api/" + volume + "/" + id);
  },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
};
