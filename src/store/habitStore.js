// /src/store/habitStore.js
import { create } from "zustand";

// Define the shape of your state and actions
const useHabitStore = create((set) => ({
  // 1. STATE (Data)
  habits: [], // Initial empty array
  habit: null, // habit null or {}
  isFetchingHabits: false,
  isError: null,

  // 2. ACTIONS (Functions to modify the state)

  // -1. Initializes the state when data is fetched from the server
  setHabits: (fetchedHabits) => set({ habits: fetchedHabits }),

  // -1.5 Initializes the habit when habit detail is fetched from the server
  setHabit: (updates) =>
    set((state) => ({
      habit: state.habit ? { ...state.habit, ...updates } : updates,
    })),

  // 0. Initial Fetch Actions
  setIsFetchingHabits: (status) => set({ isFetchingHabits: status }),

  // 0.5 Setting Error
  setIsError: (error) => set({ isError: error }),

  // 1. Add new habit
  addHabit: (newHabit) =>
    set((state) => ({
      habits: [...state.habits, newHabit],
    })),

  // 2. Add a new complete date on existing habit (e.g., ticking it off today)
  setCompleteHabit: (habitId, date) =>
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id === habitId) {
          return { ...habit, completedDates: [...habit.completedDates, date] };
        }

        return habit;
      }),
    })),

  setUnCompleteHabit: (habitId, date) =>
    set((state) => ({
      habits: state.habits.map((habit) => {
        if (habit.id === habitId) {
          return {
            ...habit,
            completedDates: habit.completedDates.filter((completedDate) => completedDate !== date),
          };
        }

        return habit;
      }),
    })),

  // 3. Remove a habit
  removeHabit: (habitId) =>
    set((state) => ({
      habits: state.habits.filter((habit) => habit.habitId !== habitId),
    })),

  // 4 & 5. Update habit name/color/etc. (General Update)
  updateHabit: (habitId, updates) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.habitId === habitId
          ? { ...habit, ...updates } // Merge existing habit with new updates
          : habit,
      ),
    })),

  // 6. Add a new time duration on existing habit
  addTimeDuration: (habitId, duration) =>
    set((state) => ({
      habits: state.habits.map((habit) =>
        habit.habitId === habitId
          ? {
              ...habit,
              TimeDurations: [...habit.TimeDurations, duration],
            }
          : habit,
      ),
    })),
}));

export default useHabitStore;
