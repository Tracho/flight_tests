import MyBtn from '../ui/button/MyBtn'
import InputEnter from '../ui/form/InputEnter'
import MyInput from '../ui/form/MyInput'
import Checkbox from '../ui/input/Checkbox'
import Radio from '../ui/input/Radio'

function HomePage () {
  return (
    <>
      <div className='flex justify-center'>
        <div className='container px-4 py-10'>
          <h1>HomePage</h1>
          <MyBtn mstyle='green'>test 1</MyBtn>
          <MyInput />
          <br />
          <div className='flex flex-col py-3 gap-2'>
            <Radio name='quiz-answer' value='a' mstyle='blue'>
              Вариант А (Правильный)
            </Radio>
            <Radio name='quiz-answer' value='b' mstyle="green" isCorrect={true}>
              Вариант Б
            </Radio>
            <Radio name='quiz-answer' value='c' mstyle='danger'  isCorrect={false} disabled>
              Вариант В
            </Radio>
          </div>
          <div className='flex flex-col py-3 gap-2'>
            <Checkbox value='a' mstyle='blue'>
              Первый правильный вариант
            </Checkbox>
            <Checkbox value='b' mstyle='green' isCorrect={true}>
              Второй правильный вариант
            </Checkbox>
            <Checkbox value='c' mstyle='danger' isCorrect={false} >
              Неправильный вариант ответа
            </Checkbox>
          </div>

          <br />
          <InputEnter inpClassName='w-100'>➔</InputEnter>
        </div>
      </div>
    </>
  )
}

export default HomePage
