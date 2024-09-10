 "use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "../types/task";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('pending');

  // Função para buscar todas as tarefas
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`${process.env.TASK_API_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  // Função para criar uma nova tarefa
  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status
    };

    try {
      const response = await axios.post(`${process.env.TASK_API_URL}/tasks`, {
        "title": newTask.title,
        "description": newTask.description,
        "status": newTask.status
      },
        {
            headers: {
            'Content-Type': 'application/json', // Garante que o Content-Type não acione a preflight request
          },
        }
      );
      setTasks([...tasks, response.data]); // Adiciona a nova tarefa à lista existente
      setTitle(''); // Limpa o campo de título após o envio
      setDescription(''); // Limpa o campo de descrição após o envio
      setStatus('pending'); // Reseta o status
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Tarefas</h2>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.ID}
            className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <strong className="text-lg font-bold text-blue-600">{task.title}</strong>
            <p className="text-gray-700">{task.description}</p>
            <span className={`text-sm ${task.status === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {task.status}
            </span>
          </li>
        ))}
      </ul>

      {/* Formulário para criar uma nova tarefa */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Criar Nova Tarefa</h3>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-gray-700">Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-blue-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Descrição:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-blue-700"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-blue-700"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Criar Tarefa
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskList;
