import NeonBtn from "@/ui/button/NeonBtn";
import Details from "@/ui/list/Details/Details";
import DoubleProgressBar from "@/ui/list/progress/DoubleProgressBar";

type props = {
  data: {
    category: string;
    description: string;
    arr: {
      json: {
        title: string;
        timestamp: string;
        correctAnswer: string;
        options: {
          text: string;
          isCorrect: boolean;
        }[];
      }[];
      storage_q_passed: number[];
      storage_q_not_passed: number[];
      storage_q_saved: number[];
      title: string;
      description: string;
    }[];
  }[];
};

function HomePage({ data }: props) {
  console.log(data);
  return (
    <>
      <div className="flex justify-center">
        <div className="container px-4 py-10">
          <div className="flex flex-col gap-4">
            {data.map((item, index) => (
              <Details
                key={index}
                title={item.category}
                description={item.description}
                childrenClass="flex-col"
              >
                {item.arr.map((childItem, childIndex) => (
                  <Details
                    key={childIndex}
                    title={childItem.title}
                    description={childItem.description}
                    childrenClass="flex-col"
                    titleClass="text-lg"
                    svgClass="w-6"
                  >
                    <div>
                      <DoubleProgressBar greenProgress={45} redProgress={70} />
                    </div>

                    <Details
                      title={`🚨 Вопросы с ошибками (${childItem.storage_q_not_passed.length})`}
                      childrenClass="flex-wrap"
                      titleClass="text-base"
                      svgClass="w-5"
                    >
                      {childItem.storage_q_not_passed.map((i, _) => (
                        <NeonBtn
                          className="text-xs"
                          color="red"
                          variant="solid"
                          key={_}
                        >
                          {i}
                        </NeonBtn>
                      ))}
                    </Details>
                    <Details
                      title={`✅ Изученные вопросы (${childItem.storage_q_passed.length})`}
                      childrenClass="flex-wrap"
                      titleClass="text-base"
                      svgClass="w-5"
                    >
                      {childItem.storage_q_passed.map((i, _) => (
                        <NeonBtn
                          className="text-xs"
                          color="green"
                          variant="solid"
                          key={_}
                        >
                          {i}
                        </NeonBtn>
                      ))}
                    </Details>
                    <Details
                      title={`💾 Сохраненные вопросы (${childItem.storage_q_saved.length})`}
                      childrenClass="flex-wrap"
                      titleClass="text-base"
                      svgClass="w-5"
                    >
                      {childItem.storage_q_saved.map((i, _) => (
                        <NeonBtn
                          className="text-xs"
                          color="amber"
                          variant="solid"
                          key={_}
                        >
                          {i}
                        </NeonBtn>
                      ))}
                    </Details>
                    <Details
                      title={`❔ Не пройденные вопросы (${childItem.json.length})`}
                      childrenClass="flex-wrap"
                      titleClass="text-base"
                      svgClass="w-5"
                    >
                      {Array.from({ length: childItem.json.length }).map(
                        (_, index) => {
                          const questionNumber = index + 1; // Номер вопроса (1, 2, 3...)

                          return (
                            <NeonBtn
                              className="text-xs"
                              color="gray"
                              variant="solid"
                              key={index}
                            >
                              {questionNumber}
                            </NeonBtn>
                          );
                        },
                      )}
                    </Details>
                  </Details>
                ))}
              </Details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
