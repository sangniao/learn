package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type Course struct {
	Name   string  `json:"name"`
	Price  int     `json:"price"`
	Id     string  `json:"id"`
	Author *Author `json:"author"`
}

type Author struct {
	Name   string `json:"name"`
	Github string `json:"github"`
}

// A fake database
var courseDB []Course

func (c *Course) IsEmpty() bool {
	return c.Name == "" && c.Id == ""
}

func serveHome(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "Not found", http.StatusNotFound)
		return
	}
}

func getCourses(w http.ResponseWriter, r *http.Request) {
	if len(courseDB) == 0 {
		w.WriteHeader(http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	e := json.NewEncoder(w)
	e.Encode(courseDB)
}

func getCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	e := json.NewEncoder(w)
	for _, c := range courseDB {
		if c.Id == params["id"] {
			e.Encode(c)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
}

func addCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	e := json.NewEncoder(w)

	var c Course
	err := json.NewDecoder(r.Body).Decode(&c)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if c.IsEmpty() {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	courseDB = append(courseDB, c)
	w.WriteHeader(http.StatusCreated)
	e.Encode(c)
}

func updateCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	e := json.NewEncoder(w)

	var crs Course
	err := json.NewDecoder(r.Body).Decode(&crs)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if crs.IsEmpty() {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	params := mux.Vars(r)
	for i, c := range courseDB {
		if c.Id == params["id"] {
			courseDB = append(courseDB[:i], courseDB[i+1:]...)
			courseDB = append(courseDB, crs)
			w.WriteHeader(http.StatusCreated)
			e.Encode(crs)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
}

func deleteCourse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for i, c := range courseDB {
		if c.Id == params["id"] {
			courseDB = append(courseDB[:i], courseDB[i+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
}

func courses(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getCourses(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func course(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		getCourse(w, r)
	case "POST":
		addCourse(w, r)
	case "PUT":
		updateCourse(w, r)
	case "DELETE":
		deleteCourse(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func main() {
	fmt.Println("Starting server on port 8080...")
	r := mux.NewRouter()
	courseDB = append(courseDB, Course{Name: "Go", Price: 100, Id: "1", Author: &Author{Name: "Ahmad", Github: "ahmadexe"}})
	courseDB = append(courseDB, Course{Name: "Flutter", Price: 100, Id: "2", Author: &Author{Name: "Another Ahmad", Github: "another_ahmadexe"}})
	r.HandleFunc("/", serveHome)
	r.HandleFunc("/courses", courses)
	r.HandleFunc("/course", course)
	r.HandleFunc("/courses/{id}", course)

	log.Fatal(http.ListenAndServe(":8080", r))
}
