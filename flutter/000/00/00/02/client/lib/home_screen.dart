import 'package:client/data/cubit/data_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {

  @override
  void initState() {
    super.initState();
    final dataCubit = BlocProvider.of<DataCubit>(context);
    dataCubit.fetchAllCourses();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
      ),
      body: Center(
        child: BlocBuilder<DataCubit, DataState>(
          builder: (context, state) {
            if (state.fetchAllState is FetchAllLoading ||
                state.fetchAllState is FetchAllInitial ||
                state is DataDefault) {
              return const CircularProgressIndicator();
            } else if (state.fetchAllState is FetchAllSuccess) {
              final data = state.fetchAllState.courses!;
              return ListView.builder(
                itemCount: data.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(data[index].name),
                  );
                },
              );
            }
            return Text(state.fetchAllState.message!);
          },
        ),
      ),
    );
  }
}
