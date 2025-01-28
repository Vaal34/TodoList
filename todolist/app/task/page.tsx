import { Task, columns } from "./column"
import { DataTable } from "./datatable"

async function getData(): Promise<Task[]> {
  return [
    {
      id: "1",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
    {
      id: "2",
      title: "Créer une interface utilisateur",
      status: "en cours",
      priority: "haute",
      dueDate: "2024-03-20",
    },
  ]
}

export default async function TasksTable() {
  const data = await getData()

  return (
    <DataTable columns={columns} data={data} />
  )
}
