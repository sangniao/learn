// ignore_for_file: public_member_api_docs, sort_constructors_first
part of 'data_cubit.dart';

@immutable
class DataState extends Equatable {
  final List<Course>? courses;
  final String? message;
  final FetchAllState fetchAllState;

  const DataState({
    this.courses,
    this.message,
    required this.fetchAllState,
  });

  @override
  List<Object?> get props => [courses, message, fetchAllState];

  DataState copyWith({
    List<Course>? courses,
    String? message,
    FetchAllState? fetchAllState,
  }) {
    return DataState(
      courses: courses ?? this.courses,
      message: message ?? this.message,
      fetchAllState: fetchAllState ?? this.fetchAllState,
    );
  }
}

class DataDefault extends DataState {
  DataDefault()
      : super(
          fetchAllState: FetchAllInitial(),
        );
}
