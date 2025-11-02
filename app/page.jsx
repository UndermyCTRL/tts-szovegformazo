"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [chunks, setChunks] = useState([]);
  const [pitch, setPitch] = useState(50);
  const [speed, setSpeed] = useState(50);

  const MAX_CHARS = 2000;

  // 🔹 Szöveg formázása és darabolása
  const formatText = () => {
    let text = input;

    // Kisebb szünet minden mondat végére
    text = text.replace(/([.!?])\s*/g, "$1 ... ");

    // Angol szavak fonetikusra cserélése
    const phoneticMap = {
      "loot": "lút",
      "build": "bíld",
      "storm": "sztorm",
      "earth": "örsz",
      "wolf": "vulf",
      "bear": "beer",
      "damage": "demidzs",
      "critical": "kritiköl",
      "boss": "bosz",
      "aspect": "eszpekt",
      "skill": "szkill",
      "gem": "dzsem"
    };
    Object.entries(phoneticMap).forEach(([eng, hun]) => {
      const regex = new RegExp("\\b" + eng + "\\b", "gi");
      text = text.replace(regex, hun);
    });

    // Felesleges szóközök eltávolítása
    text = text.replace(/\s+/g, " ").trim();

    // 🔹 Feldarabolás 2000 karakterenként
    const parts = [];
    for (let i = 0; i < text.length; i += MAX_CHARS) {
      parts.push(text.slice(i, i + MAX_CHARS));
    }

    setChunks(parts);
  };

  const copyToClipboard = (chunk) => {
    navigator.clipboard.writeText(chunk);
    alert("✅ Ez a rész kimásolva!");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        TTS Szövegformázó
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl space-y-4">
        <textarea
          className="mt-1 block w-full border rounded-md p-2 h-40"
          placeholder="Illeszd be ide a szöveget..."
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
          Szöveg formázása és feldarabolása
        </button>

        {chunks.length > 0 && (
          <div className="mt-6 space-y-6">
            {chunks.map((chunk, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-xl p-4 shadow-sm"
              >
                <h2 className="font-semibold text-gray-700 mb-2">
                  Rész {index + 1} / {chunks.length} ({chunk.length} karakter)
                </h2>
                <textarea
                  className="w-full border rounded-md p-2 h-40 mb-2"
                  value={chunk}
                  readOnly
                ></textarea>
                <button
                  onClick={() => copyToClipboard(chunk)}
                  className="bg-green-600 text-white rounded-xl py-2 px-4 w-full"
                >
                  Másolás
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
