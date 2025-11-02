export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        TTS Szövegformázó
      </h1>

      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg space-y-4">
        <label className="block">
          <span className="text-gray-700">Bevitt szöveg:</span>
          <textarea
            className="mt-1 block w-full border rounded-md p-2"
            rows="5"
            placeholder="Írd ide a szöveget..."
          ></textarea>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-700">Hangmagasság:</span>
            <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
          </div>
          <div>
            <span className="text-gray-700">Beszédsebesség:</span>
            <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
          </div>
        </div>

        <button className="bg-blue-600 text-white rounded-xl py-2 px-4 w-full">
          Másolás
        </button>
      </div>
    </main>
  );
}
