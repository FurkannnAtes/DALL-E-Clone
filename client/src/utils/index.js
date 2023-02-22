import FileSaver from "file-saver";

import { surpriseMePrompts } from "../constans/supraseMePromt";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function dowloadImage(_id, photo) {
  console.log(_id, photo);
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
