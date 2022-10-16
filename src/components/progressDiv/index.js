export default function ProgressDiv({ setCurrent, current }) {
  return (
    <div className="progressDiv">
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
    </div>
  )
}
