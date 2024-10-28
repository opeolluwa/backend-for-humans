import { createApp } from "vue";

createApp({
  data() {
    return {
      exercise_name: "Introduction to programming",
    };
  },
  computed: {
    exercise() {
      return [
        {
          question: "Which of these best explains programming",
          options: ["ffff", "wljkfhbv", "wlkehjfbl", "wlkfjh,b"],
          answer: 2,
        },
        {
          question: "Which of these best explains programming",
          options: ["ffff", "wljkfhbv", "wlkehjfbl", "wlkfjh,b"],
          answer: 2,
        },
        {
          question: "Which of these best explains programming",
          options: ["ffff", "wljkfhbv", "wlkehjfbl", "wlkfjh,b"],
          answer: 2,
        },
      ];
    },
  },
}).mount("#app");
