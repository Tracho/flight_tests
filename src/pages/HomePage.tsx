import Details from '@/ui/list/Details/Details'

type props = {
  DB: {
    json: {
      title: string
      timestamp: string
      correctAnswer: string
      options: {
        text: string
        isCorrect: boolean
      }[]
    }[]
    title: string
    description: string
  }[]
}

function HomePage ({ DB }: props) {
  console.log(DB)
  return (
    <>
      <div className='flex justify-center'>
        <div className='container px-4 py-10'>
          <div className='flex flex-col gap-4'>
            {DB.map((item, index) => (
              <Details key={index} title={item.title} description={item.description} arr={['1', '2', '3']} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
