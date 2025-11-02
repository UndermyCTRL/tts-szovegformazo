"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [pitch, setPitch] = useState(50);
  const [speed, setSpeed] = useState(50);

  // 🔹 Szöveg formázása a TTSFree-hez
  const formatText = () => {
    let text = input;

    // Kisebb szünet minden mondat végére
    text = text.replace(/([.!?])\s*/g, "$1 ... ");

    // Angol szavak fonetikusra cserélése (példa)
    const phoneticMap = {
      "loot": "lút",
      "build": "bíld",
      "storm": "sztorm",
      "earth": "örsz",
      "wolf": "vulf",
      "bear": "beer",
      "damage": "demidzs",
      "critical": "kritiköl",
      "boss": "bosz"
    };
    Object.entries(phoneticMap).forEach(([eng, hun]) => {
      const regex = new RegExp("\\b" + eng + "\\b", "gi");
      text = text.replace(regex, hun);
    });

    // Felesleges szóközök eltávolítása
    text = text.replace(/\s+/g, " ").trim();

    setOutput(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert("✅ Szöveg kimásolva!");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        TTS Szövegformázó
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg space-y-4">
        <textarea
          className="mt-1 block w-full border rounded-md p-2 h-40"
          placeholder="Írd ide a szöveget..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-700">Hangmagasság:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <span className="text-gray-700">Beszédsebesség:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={formatText}
          className="bg-blue-600 text-white rounded-xl py-2 px-4 w-full"
        >
          Szöveg formázása
        </button>

        {output && (
          <div className="mt-4">
            <h2 className="font-semibold text-gray-700 mb-2">Eredmény:</h2>
            <textarea
              className="w-full border rounded-md p-2 h-40"
              value={output}
              readOnly
            ></textarea>
            <button
              onClick={copyToClipboard}
              className="bg-green-600 text-white rounded-xl py-2 px-4 w-full mt-2"
            >
              Másolás
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
