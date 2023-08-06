import 'dart:convert';

// ignore_for_file: public_member_api_docs, sort_constructors_first
class Author {
  final String name;
  final String github;
  
  Author({
    required this.name,
    required this.github,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'github': github,
    };
  }

  factory Author.fromMap(Map<String, dynamic> map) {
    return Author(
      name: map['name'] as String,
      github: map['github'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory Author.fromJson(String source) => Author.fromMap(json.decode(source) as Map<String, dynamic>);
}
