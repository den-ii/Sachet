export const userDetails = { nin: "", phoneNumber: "" };
export const camera = {
  choice: "front",
  front: {
    audio: false,
    video: { facingMode: "user" },
  },
  back: {
    audio: false,
    video: { facingMode: { exact: "environment" } },
  },
};
