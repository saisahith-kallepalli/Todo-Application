import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TodoContainer } from "../../Components/TodoContainer";
import { useSelector } from "react-redux";

type InCompletedTodosProps = {};

export const InCompletedTodos = (props: InCompletedTodosProps) => {
  const { listOfTodos, isPopup } = useSelector((state: any) => state.todo);

  const OnGoingTodosList = listOfTodos
    .filter((each: any) => each.completed === false)
    .filter((each: any) => {
      if (each.countdown === false) {
        return each;
      } else {
        const today = new Date();
        const sec = today.getTime();
        const endDate = new Date(each.endDate);
        const endSec = endDate.getTime();
        const startDate = new Date(each.startDate);
        const startSec = startDate.getTime();

        if (sec >= startSec && sec <= endSec) {
          return each;
        }
      }
    });
  return (
    <View>
      {OnGoingTodosList.map((each: any) => (
        <TodoContainer todo={each} key={each.id} />
      ))}
    </View>
  );
};
