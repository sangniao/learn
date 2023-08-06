// ignore_for_file: depend_on_referenced_packages

import 'package:bloc/bloc.dart';
import 'package:client/data/cubit/repository.dart';
import 'package:client/models/course.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

part 'data_state.dart';
part 'states/fetch_all/_fetch_state.dart';

class DataCubit extends Cubit<DataState> {
  DataCubit() : super(DataDefault());

  final repo = Repository();
  Future<void> fetchAllCourses() async {
    emit(
      state.copyWith(
        fetchAllState: FetchAllLoading(),
      ),
    );
    try {
      final courses = await repo.fetchAllCourses();
      emit(
        state.copyWith(
          fetchAllState: FetchAllSuccess(courses: courses),
        ),
      );
    } catch (e) {
      emit(
        state.copyWith(
          fetchAllState: FetchAllError(message: e.toString()),
        ),
      );
    }
  }
}
