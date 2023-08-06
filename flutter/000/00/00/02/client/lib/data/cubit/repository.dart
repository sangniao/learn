import 'package:client/data/cubit/data_provider.dart';
import 'package:client/models/course.dart';

class Repository {
  Future<List<Course>> fetchAllCourses() async {
    final raw = await DataProvider.fetchAllCourses();
    List<Course> c = List<Course>.from(raw.map((e) => Course.fromMap(e)));
    return c;
  }

  Future<Course> fetchCourseById(String id) async {
    final raw = await DataProvider.fetchCourseById(id);
    return Course.fromMap(raw);
  }

  Future<void> addCourse(Course course) async {
    await DataProvider.addCourse(course.toMap());
  }

  Future<void> updateCourse(Course course) async {
    await DataProvider.updateCourse(course.toMap());
  }

  Future<void> deleteCourse(String id) async {
    await DataProvider.deleteCourse(id);
  }
}
