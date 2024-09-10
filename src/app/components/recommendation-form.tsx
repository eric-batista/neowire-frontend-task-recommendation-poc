 "use client"
// components/RecommendationForm.tsx
import { useState } from "react";
import axios from "axios";
import { RecommendationInput, RecommendationOutput } from "../types/recommendation";
import RecommendationResult from "./recommendation-result"; // Importando o componente de resultado

const RecommendationForm = () => {
  const [complexity, setComplexity] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<number[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input: RecommendationInput = {
      complexity: parseInt(complexity.toString(), 10),
      duration: parseInt(duration.toString(), 10),
    };

    try {
      const response = await axios.post<RecommendationOutput>(`${process.env.RECOMMENDATION_API_URL}/recommendations/`, {
        "complexity": input.complexity,
        "duration": input.duration
      },
        {
            headers: {
            'Content-Type': 'application/json', // Garante que o Content-Type não acione a preflight request
          },
        }
      );
      setRecommendations(response.data.recommended_tasks); // Define as recomendações recebidas
    } catch (error) {
      console.error("Erro ao buscar recomendações:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Obter Recomendações de Tarefas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Complexidade:</label>
          <input
            type="number"
            value={complexity}
            onChange={(e) => setComplexity(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-blue-700"
          />
        </div>
        <div>
          <label className="block text-gray-700">Duração:</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-blue-700"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Obter Recomendações
        </button>
      </form>

      {/* Exibindo o componente de resultado de recomendações */}
      {recommendations.length > 0 && <RecommendationResult recommendedTasks={recommendations} />}
    </div>
  );
};

export default RecommendationForm;

