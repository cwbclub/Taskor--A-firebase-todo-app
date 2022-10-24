import { useAuth } from '../../context/AuthContext'
import TaskCard from '../taskCard'
import { motion } from 'framer-motion'
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.34,
    },
  },
  exit: {
    x: '80vw',
    opacity: 0,
  },
}

export default function TaskList({ data, current }) {
  const { user } = useAuth()

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

  return (
    <div className="wrapper">
      {data.length ? (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="taskList"
            layout
          >
            {data.map((item) => (
              <TaskCard item={item} uid={user?.uid} key={item.id} />
            ))}
          </motion.div>
        </>
      ) : (
        <p className="noTask">{noTaskMap[current]}</p>
      )}
    </div>
  )
}
