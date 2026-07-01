import CategoryNavi from "@/ui/list/navigation/CategoryNavi";
import QuizDashboard from "@/ui/list/QuizDashboard/QuizDashboard";

function HomePage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="container px-4 py-10 flex justify-between gap-8 flex-col sm:flex-row">
          {/* Левая колонка (Навигация) */}
          <div className="w-full sm:w-[320px] shrink-0">
            <CategoryNavi />
          </div>

          {/* Правая колонка (Панель) */}
          <div className="w-full sm:flex-1 min-w-0">
            <QuizDashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
