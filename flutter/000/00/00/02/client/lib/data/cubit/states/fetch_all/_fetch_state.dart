part of '../../data_cubit.dart';

abstract class FetchAllState {
  final List<Course>? courses;
  final String? message;

  const FetchAllState({
    this.courses,
    this.message,
  });
}

class FetchAllInitial extends FetchAllState {}

class FetchAllLoading extends FetchAllState {}

class FetchAllSuccess extends FetchAllState{
  const FetchAllSuccess({
    required List<Course> courses,
  }) : super(courses: courses);
}

class FetchAllError extends FetchAllState {
  const FetchAllError({
    required String message,
  }) : super(message: message);
}