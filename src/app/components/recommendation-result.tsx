import React from "react";

interface RecommendationResultProps {
  recommendedTasks: number[]; // Array de IDs de tarefas recomendadas
}

const RecommendationResult: React.FC<RecommendationResultProps> = ({ recommendedTasks }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-blue-800">Tarefas Recomendadas</h3>
      {recommendedTasks.length > 0 ? (
        <ul className="space-y-2 mt-2">
          {recommendedTasks.map((taskId) => (
            <li key={taskId} className="p-2 border border-gray-300 rounded-lg">
              Tarefa ID: {taskId}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600">Nenhuma recomendação disponível.</p>
      )}
    </div>
  );
};

export default RecommendationResult;
