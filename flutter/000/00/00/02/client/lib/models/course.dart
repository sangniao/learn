// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:client/models/author.dart';

class Course {
  final String name;
  final int price;
  final String id;
  final Author author;

  Course({
    required this.name,
    required this.price,
    required this.id,
    required this.author,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'price': price,
      'id': id,
      'author': author.toMap(),
    };
  }

  factory Course.fromMap(Map<String, dynamic> map) {
    return Course(
      name: map['name'] as String,
      price: map['price'] as int,
      id: map['id'] as String,
      author: Author.fromMap(map['author'] as Map<String, dynamic>),
    );
  }

  String toJson() => json.encode(toMap());

  factory Course.fromJson(String source) =>
      Course.fromMap(json.decode(source) as Map<String, dynamic>);
}
