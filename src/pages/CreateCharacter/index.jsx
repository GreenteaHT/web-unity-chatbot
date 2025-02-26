import { useRef, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import { useNavigate } from "react-router-dom";
import useCharacterStore from "@/store/useCharacterStore";
import {
  MAX_CHARACTER_NAME_LENGTH,
  MAX_CHARACTER_DESCRIPTION_LENGTH,
  MAX_CHARACTER_BACKGROUND_LENGTH,
  MAX_DIALOGUE_USER_MESSAGE_LENGTH,
  MAX_DIALOGUE_RESPONSE_LENGTH,
  MAX_LOREBOOK_TITLE_LENGTH,
  MAX_LOREBOOK_CONTENT_LENGTH,
} from "@/utils/constants";

const TOTAL_STEPS = 5;
const STEPS = [
  { index: 1, title: "Basic Info" },
  { index: 2, title: "Details & Background" },
  { index: 3, title: "Dialogue Examples" },
  { index: 4, title: "Lorebook" },
  { index: 5, title: "3D Models & Scene" },
];

export default function CreateCharacter() {
  const navigate = useNavigate();
  const addCharacter = useCharacterStore((state) => state.addCharacter);

  const [currentStep, setCurrentStep] = useState(1);
  const [characterData, setCharacterData] = useState({
    name: "",
    images: null,
    description: "",
    tags: [],
    backgroundStory: "",
    dialogues: [],
    lorebook: [],
    modelType: "vrm",
    modelUrl: "",
    fallbackImage: null,
  });
  const [tempTagValue, setTempTagValue] = useState("");
  const fileInputRef = useRef(null);

  const handleNextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleAddDialog = () => {
    setCharacterData((prev) => ({
      ...prev,
      dialogues: [
        ...prev.dialogues,
        { userMessage: "", characterResponse: "" },
      ],
    }));
  };

  const handleDialogueChange = (index, field, value) => {
    setCharacterData((prev) => {
      const newDialogues = [...prev.dialogues];
      newDialogues[index] = { ...newDialogues[index], [field]: value };
      return { ...prev, dialogues: newDialogues };
    });
  };

  const handleRemoveDialogue = (index) => {
    setCharacterData((prev) => {
      const newDialogues = prev.dialogues.filter((_, i) => i !== index);
      return { ...prev, dialogues: newDialogues };
    });
  };

  const handleAddLorebook = () => {
    setCharacterData((prev) => ({
      ...prev,
      lorebook: [...prev.lorebook, { title: "", content: "" }],
    }));
  };

  const handleLorebookChange = (index, field, value) => {
    setCharacterData((prev) => {
      const newLorebook = [...prev.lorebook];
      newLorebook[index] = { ...newLorebook[index], [field]: value };
      return { ...prev, lorebook: newLorebook };
    });
  };

  const handleRemoveLorebook = (index) => {
    setCharacterData((prev) => {
      const newLorebook = prev.lorebook.filter((_, i) => i !== index);
      return { ...prev, lorebook: newLorebook };
    });
  };

  const handleAddTag = () => {
    if (
      tempTagValue.trim() &&
      !characterData.tags.includes(tempTagValue.trim())
    ) {
      setCharacterData((prev) => ({
        ...prev,
        tags: [...prev.tags, tempTagValue.trim()],
      }));
    }
    setTempTagValue("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setCharacterData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.size <= 5 * 1024 * 1024 &&
      ["image/png", "image/jpeg"].includes(file.type)
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        setCharacterData((prev) => ({
          ...prev,
          images: [reader.result],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileChange({ target: { files: [file] } });
  };

  const handleSubmit = () => {
    const key = characterData.name.trim();
    addCharacter(key, characterData);
    navigate(`/character/${key}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center">
          <button className="mr-4" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <span className="text-xl font-semibold">Create New Character</span>
        </div>
      </div>

      <div className="w-full bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step) => (
              <div
                key={step.index}
                className={`flex flex-col items-center ${
                  currentStep >= step.index
                    ? "text-indigo-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    currentStep >= step.index
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {step.index}
                </div>
                <span className="text-xs text-center">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 bg-indigo-600 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium">
                  Character Name
                </span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  maxLength={MAX_CHARACTER_NAME_LENGTH}
                  value={characterData.name}
                  onChange={(e) =>
                    setCharacterData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter character name"
                />
                <div className="text-right text-sm text-gray-500">
                  {characterData.name.length} / {MAX_CHARACTER_NAME_LENGTH}
                </div>
              </label>

              <div>
                <span className="text-gray-700 font-medium block mb-2">
                  Character Image
                </span>
                {characterData.images ? (
                  <div className="relative">
                    <img
                      src={characterData.images}
                      alt="Preview"
                      className="rounded-lg w-full max-h-64 object-contain"
                    />
                    <button
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                          fileInputRef.current.click();
                        }
                      }}
                      className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm block mx-auto"
                    >
                      Input other image
                    </button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="flex flex-col items-center">
                      <p className="text-gray-600 text-center mb-2">
                        Drag & drop an image here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                      <button className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                        Select Image
                      </button>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block">
                <span className="text-gray-700 font-medium">
                  Character Description
                </span>
                <textarea
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  rows={4}
                  maxLength={MAX_CHARACTER_DESCRIPTION_LENGTH}
                  value={characterData.description}
                  onChange={(e) =>
                    setCharacterData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe your character's personality, role, and characteristics"
                />
                <div className="text-right text-sm text-gray-500">
                  {characterData.description.length} /{" "}
                  {MAX_CHARACTER_DESCRIPTION_LENGTH}
                </div>
              </label>
            </div>

            <div>
              <span className="text-gray-700 font-medium block mb-2">
                Character Tags
              </span>
              <div className="flex flex-wrap gap-2 mb-2">
                {characterData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      className="ml-2"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Add a tag"
                  value={tempTagValue}
                  onChange={(e) => setTempTagValue(e.target.value)}
                />
                <button
                  className="ml-2 p-2 bg-indigo-600 text-white rounded-lg"
                  onClick={handleAddTag}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div>
              <label className="block">
                <span className="text-gray-700 font-medium">
                  Background Story
                </span>
                <textarea
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  rows={6}
                  maxLength={MAX_CHARACTER_BACKGROUND_LENGTH}
                  value={characterData.backgroundStory}
                  onChange={(e) =>
                    setCharacterData((prev) => ({
                      ...prev,
                      backgroundStory: e.target.value,
                    }))
                  }
                  placeholder="Write your character's background story and history"
                />
                <div className="text-right text-sm text-gray-500">
                  {characterData.backgroundStory.length} /{" "}
                  {MAX_CHARACTER_BACKGROUND_LENGTH}
                </div>
              </label>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              {characterData.dialogues.map((dialogue, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-gray-700 font-medium">
                      Example Dialog {index + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveDialogue(index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-gray-700">User&apos;s Message</span>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        maxLength={MAX_DIALOGUE_USER_MESSAGE_LENGTH}
                        value={dialogue.userMessage}
                        onChange={(e) =>
                          handleDialogueChange(
                            index,
                            "userMessage",
                            e.target.value
                          )
                        }
                        placeholder="User's message"
                      />
                      <div className="text-right text-sm text-gray-500">
                        {dialogue.userMessage.length} /{" "}
                        {MAX_DIALOGUE_USER_MESSAGE_LENGTH}
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-gray-700">
                        Character&apos;s Response
                      </span>
                      <textarea
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        rows={3}
                        maxLength={MAX_DIALOGUE_RESPONSE_LENGTH}
                        value={dialogue.characterResponse}
                        onChange={(e) =>
                          handleDialogueChange(
                            index,
                            "characterResponse",
                            e.target.value
                          )
                        }
                        placeholder="Character's response"
                      />
                      <div className="text-right text-sm text-gray-500">
                        {dialogue.characterResponse.length} /{" "}
                        {MAX_DIALOGUE_RESPONSE_LENGTH}
                      </div>
                    </label>
                  </div>
                </div>
              ))}

              <button
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
                onClick={handleAddDialog}
              >
                <Plus className="inline mr-2" size={20} />
                Add Another Example
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-4">
              {characterData.lorebook.map((entry, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-gray-700 font-medium">
                      Example Dialog {index + 1}
                    </span>
                    <button
                      onClick={() => handleRemoveLorebook(index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <label className="block">
                      <span className="text-gray-700 font-medium">
                        Entry Title
                      </span>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        maxLength={MAX_LOREBOOK_TITLE_LENGTH}
                        value={entry.title}
                        onChange={(e) =>
                          handleLorebookChange(index, "title", e.target.value)
                        }
                        placeholder="Entry Title"
                      />
                      <div className="text-right text-sm text-gray-500">
                        {entry.title.length} / {MAX_LOREBOOK_TITLE_LENGTH}
                      </div>
                    </label>
                    <label className="block">
                      <span className="text-gray-700 font-medium">Content</span>
                      <textarea
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                        rows={4}
                        maxLength={MAX_LOREBOOK_CONTENT_LENGTH}
                        value={entry.content}
                        onChange={(e) =>
                          handleLorebookChange(index, "content", e.target.value)
                        }
                        placeholder="Entry content and details"
                      />
                      <div className="text-right text-sm text-gray-500">
                        {entry.content.length} / {MAX_LOREBOOK_CONTENT_LENGTH}
                      </div>
                    </label>
                  </div>
                </div>
              ))}

              <button
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
                onClick={handleAddLorebook}
              >
                <Plus className="inline mr-2" size={20} />
                Add Lorebook Entry
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <span className="text-gray-700 font-medium block mb-2">
                3D Model Type
              </span>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  className={`p-4 border-2 rounded-lg text-center space-y-2 ${
                    characterData.modelType === "vrm"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    setCharacterData((prev) => ({
                      ...prev,
                      modelType: "vrm",
                    }))
                  }
                >
                  <span className="font-medium text-indigo-600">VRM Model</span>
                  <p className="text-sm text-gray-600">
                    Single character model
                  </p>
                </button>
                <button
                  className={`p-4 border-2 rounded-lg text-center space-y-2 ${
                    characterData.modelType === "unity"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    setCharacterData((prev) => ({
                      ...prev,
                      modelType: "unity",
                    }))
                  }
                >
                  <span className="font-medium text-gray-700">Unity Scene</span>
                  <p className="text-sm text-gray-600">
                    Full environment setup
                  </p>
                </button>
              </div>
            </div>

            <div>
              <label className="block">
                <span className="text-gray-700 font-medium">Model URL</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  value={characterData.modelUrl}
                  onChange={(e) =>
                    setCharacterData((prev) => ({
                      ...prev,
                      modelUrl: e.target.value,
                    }))
                  }
                  placeholder="Enter URL to your VRM model"
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Provide a direct URL to your VRM model. Make sure the URL is
                accessible and the model follows VRM specifications.
              </p>
            </div>

            <div>
              <label className="block">
                <span className="text-gray-700 font-medium">
                  Fallback Image
                </span>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center">
                      Add a fallback image for when 3D viewing is not available
                    </p>
                    <button className="mt-2 px-4 py-1.5 bg-white border border-gray-300 rounded-lg text-sm">
                      Select Image
                    </button>
                  </div>
                </div>
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevStep}
            className={`px-6 py-2 rounded-lg flex items-center ${
              currentStep === 1
                ? "invisible"
                : "bg-white border border-gray-300"
            }`}
          >
            <ChevronLeft size={20} className="mr-1" />
            Back
          </button>
          <button
            onClick={
              currentStep === TOTAL_STEPS ? handleSubmit : handleNextStep
            }
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center"
          >
            {currentStep === TOTAL_STEPS ? (
              "Create Character"
            ) : (
              <>
                Next
                <ChevronRight size={20} className="ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
      <div className="h-16" />
      <NavigationBar />
    </div>
  );
}
