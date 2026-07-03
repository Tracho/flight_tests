import MyBtn from "../ui/button/MyBtn";
import MyInput from "../ui/form/MyInput";
import Checkbox from "../ui/input/Checkbox";
import Radio from "../ui/input/Radio";
import Details from "../ui/list/Details/Details";
import Info from "../ui/list/Info/Info";
import InfoHelp from "../ui/list/Info/infoHelp";
import BgContainer from "../ui/container/BgContainer";
import ProgressBar from "@/ui/list/progress/ProgressBar";
import NeonBtn from "@/ui/button/NeonBtn";
import Modal from "@/ui/Modal/Modal";
import { useState } from "react";
import InfoCorrect from "@/ui/list/Info/InfoCorrect";

export type Welcome = {
  correctAnswer: string;
  options: Option[];
  timestamp: Date;
  title: string;
};

export type Option = {
  isCorrect: boolean;
  text: string;
};

function HomePageTest() {
  // let testingDB = [
  //   {
  //     title: "Тест Заголовок",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis, commodi voluptatum quasi fuga earum cupiditate minus eius, vitae, quas nisi quo repellat atque aspernatur officia obcaecati nam repellendus esse?",
  //     json: DBtesting,
  //   },
  //   {
  //     title: "Медицинские тесты",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis, commodi voluptatum quasi fuga earum cupiditate minus eius, vitae, quas nisi quo repellat atque aspernatur officia obcaecati nam repellendus esse?",
  //     json: DbMedicalTest1,
  //   },
  // ];
  let testArr = ["1", "2", "3", "4"];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-900 dark:text-zinc-50 transition-colors duration-200">
        <div className="flex justify-center">
          <div className="container px-4 py-10">
            <h1>HomePageTest</h1>
            <br />
            <button className="bg-white text-black border border-gray-300 dark:bg-slate-800 dark:text-white dark:border-slate-700 px-4 py-2 rounded">
              Кнопка | тестовый вариант смены темы
            </button>
            <br />
            <MyBtn mstyle="green">test 1</MyBtn>
            <MyInput />
            <br />
            <div className="flex flex-col py-3 gap-2">
              <Radio name="quiz-answer" value="a" mstyle="blue">
                Вариант А (Правильный)
              </Radio>
              <Radio
                name="quiz-answer"
                value="b"
                mstyle="green"
                isCorrect={true}
              >
                Вариант Б
              </Radio>
              <Radio
                name="quiz-answer"
                value="c"
                mstyle="danger"
                isCorrect={false}
              >
                Вариант В
              </Radio>
            </div>
            <div className="flex flex-col py-3 gap-2">
              <Checkbox
                value="a"
                mstyle="blue"
                labelClassName={"bg-neutral-900"}
              >
                Первый правильный вариант
              </Checkbox>
              <Checkbox
                value="b"
                mstyle="green"
                labelClassName={"bg-neutral-900"}
                isCorrect={true}
              >
                Второй правильный вариант
              </Checkbox>
              <Checkbox
                value="c"
                mstyle="danger"
                labelClassName={"bg-neutral-900"}
                isCorrect={false}
              >
                Неправильный вариант ответа
              </Checkbox>
            </div>
            <br />
            <br />
            <Details arr={testArr} title="Test Header"></Details>
            <br />
            <br />
            <BgContainer className="flex flex-col gap-5">
              <InfoCorrect header="Lorem ipsum dolor sit amet consectetur">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Omnis, quia repellat voluptates iure tempora repellendus
                  laborum molestias expedita error, autem beatae laudantium
                  quaerat accusantium facilis minus ipsum adipisci voluptatibus
                  placeat?
                </p>
              </InfoCorrect>
              <Info header="Lorem ipsum dolor sit amet consectetur">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Omnis, quia repellat voluptates iure tempora repellendus
                  laborum molestias expedita error, autem beatae laudantium
                  quaerat accusantium facilis minus ipsum adipisci voluptatibus
                  placeat?
                </p>
              </Info>
              <InfoHelp header="Lorem ipsum dolor sit amet consectetur">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Omnis, quia repellat voluptates iure tempora repellendus
                  laborum molestias expedita error, autem beatae laudantium
                  quaerat accusantium facilis minus ipsum adipisci voluptatibus
                  placeat?
                </p>
              </InfoHelp>
            </BgContainer>
            <br /> <br />
            <ProgressBar progress={80} theme="green" />
            <ProgressBar progress={80} theme="sky" />
            <ProgressBar progress={80} theme="amber" />
            <ProgressBar progress={80} theme="neonRed" />
            {/* Стандартный размер текста */}
            <NeonBtn color="green" variant="solid">
              Solid Green
            </NeonBtn>
            <NeonBtn color="green" variant="outline">
              Outline Green
            </NeonBtn>
            {/* Изменение размера текста через className */}
            <NeonBtn color="sky" variant="solid" className="text-xs">
              Small Sky
            </NeonBtn>
            <NeonBtn color="amber" variant="outline" className="text-xl">
              Large Amber
            </NeonBtn>
            {/* Другие цвета */}
            <NeonBtn color="red" variant="solid" className="text-2xl">
              Huge Red
            </NeonBtn>
            <NeonBtn color="gray" variant="outline">
              Dark Gray
            </NeonBtn>
            <br /> <br /> <br /> <br />
            <NeonBtn
              onClick={() => setOpen(true)}
              color="gray"
              variant="outline"
            >
              Открыть
            </NeonBtn>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              title="Настройки теста"
            >
              <p className="text-neutral-300">
                Здесь можно выбрать категории, количество вопросов и режим
                прохождения.
              </p>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageTest;
