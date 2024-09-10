import RecommendationForm from "./components/recommendation-form";
import TaskList from "./components/task-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
      Gerenciamento de Tarefas e Recomendações
    </h1>
    <TaskList />
    <RecommendationForm />
  </div>
    );
}
