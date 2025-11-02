"use client";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [chunks, setChunks] = useState([]);
  const [pitch, setPitch] = useState(50);
  const [speed, setSpeed] = useState(50);

  const MAX_CHARS = 2000;

  const formatText = () => {
    let text = input;
    text = text.replace(/([.!?])\s*/g, "$1 ... ");

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

    text = text.replace(/\s+/g, " ").trim();

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
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        TTS Szövegformázó
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-5xl space-y-6">
        {/* 🔹 Fő beviteli mező */}
        <textarea
          className="mt-1 block w-full border rounded-xl p-4 text-lg h-[500px] resize-none"
          placeholder="Ide illeszd be a teljes szöveget..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        {/* Hangbeállítások */}
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
          className="bg-blue-600 text-white rounded-xl py-3 px-4 w-full text-lg"
        >
          Szöveg formázása és feldarabolása
        </button>

        {/* 🔹 Kimeneti részek */}
        {chunks.length > 0 && (
          <div className="mt-8 space-y-10 w-full">
            {chunks.map((chunk, index) => (
              <div
                key={index}
                className="bg-gray-50 border rounded-2xl p-5 shadow-sm"
              >
                <h2 className="font-semibold text-gray-700 mb-3 text-lg">
                  Rész {index + 1} / {chunks.length} ({chunk.length} karakter)
                </h2>
                <textarea
                  className="w-full border rounded-md p-3 h-[260px] text-lg resize-none"
                  value={chunk}
                  readOnly
                ></textarea>
                <button
                  onClick={() => copyToClipboard(chunk)}
                  className="bg-green-600 text-white rounded-xl py-2 px-4 w-full text-lg mt-2"
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
