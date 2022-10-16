import { useAuth } from '../../context/AuthContext'
import TaskCard from '../taskCard'

export default function TaskList({ data, current }) {
  const user = useAuth()

  const noTaskMap = {
    completed: 'No task completed',
    ongoing: 'No ongoing Tasks',
    all: 'No Task Added',
  }

  if (current === 'ongoing') {
    data = data.filter((item) => item.status)
  }
  if (current === 'completed') {
    data = data.filter((item) => !item.status)
  }

  return data.length ? (
    <>
      <div className="taskList">
        {data.map((item) => (
          <TaskCard item={item} uid={user?.uid} key={item.id} />
        ))}
      </div>
    </>
  ) : (
    <p className="noTask">{noTaskMap[current]}</p>
  )
}
