import { motion } from 'framer-motion'
const mainVariant = {
  hidden: {
    y: 18,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, type: 'tween' },
  },
  exit: {
    x: '80vw',
    opacity: 0,
  },
}

export default function ProgressDiv({ setCurrent, current }) {
  return (
    <motion.div
      variants={mainVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="progressDiv"
    >
      <span
        onClick={() => setCurrent('all')}
        className={current === 'all' ? 'active' : ''}
      >
        All
      </span>{' '}
      |{' '}
      <span
        onClick={() => setCurrent('ongoing')}
        className={current === 'ongoing' ? 'active' : ''}
      >
        On Going
      </span>{' '}
      |{' '}
      <span
        onClick={() => setCurrent('completed')}
        className={current === 'completed' ? 'active' : ''}
      >
        Completed
      </span>
    </motion.div>
  )
}
