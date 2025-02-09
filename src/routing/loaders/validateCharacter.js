import { redirect } from "react-router-dom";
import useCharacterStore from "../../store/useCharacterStore";

export const validateCharacter = ({ params }) => {
  const { name } = params;
  const { characters } = useCharacterStore.getState();
  const characterExists = name
    ? Object.values(characters).some(
        (char) => char.name.toLowerCase() === name.toLowerCase()
      )
    : true;

  if (!characterExists) {
    throw redirect("/character/not-found");
  }
  return null;
};
