import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class DataProvider {
  static final _client = http.Client();

  static Future<List<Map<String, dynamic>>> fetchAllCourses() async {
    const url = 'http://localhost:8080/courses';
    try {
      final raw = await _client.get(Uri.parse(url));
      final response = jsonDecode(raw.body);
      List<Map<String, dynamic>> data = [];
      for (var item in response) {
        data.add(item as Map<String, dynamic>);
      }
      return data;
    } catch (e) {
      debugPrint("Error: $e");
      throw Exception('Failed to load courses.');
    }
  }

  static Future<Map<String, dynamic>> fetchCourseById(String id) async {
    final url = 'http:localhost:8080/courses/$id';
    try {
      final response = await http.get(Uri.parse(url));
      return response.body as Map<String, dynamic>;
    } catch (e) {
      debugPrint("Error: $e");
      throw Exception('Failed to load courses.');
    }
  }

  static Future<void> addCourse(Map<String, dynamic> course) async {
    const url = 'http:localhost:8080/courses';
    try {
      final response = await http.post(Uri.parse(url), body: course);
      if (response.statusCode != 200) {
        throw Exception('Failed to add course.');
      }
    } catch (e) {
      debugPrint("Error: $e");
      throw Exception('Failed to add courses.');
    }
  }

  static Future<void> updateCourse(Map<String, dynamic> course) async {
    final url = 'http:localhost:8080/courses/${course['id']}';
    try {
      final response = await http.put(Uri.parse(url), body: course);
      if (response.statusCode != 200) {
        throw Exception('Failed to update course.');
      }
    } catch (e) {
      debugPrint("Error: $e");
      throw Exception('Failed to update courses.');
    }
  }

  static Future<void> deleteCourse(String id) async {
    final url = 'http:localhost:8080/courses/$id';
    try {
      final response = await http.delete(Uri.parse(url));
      if (response.statusCode != 200) {
        throw Exception('Failed to delete course.');
      }
    } catch (e) {
      debugPrint("Error: $e");
      throw Exception('Failed to delete courses.');
    }
  }
}
