export let assistantId = "asst_M7GUmMMFRma3j1NJIcB9gbJy"; // set your assistant ID here

if (assistantId === "") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
