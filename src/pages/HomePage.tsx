import NeonBtn from "@/ui/button/NeonBtn";
import Details from "@/ui/list/Details/Details";
import CategoryNavi from "@/ui/list/navigation/CategoryNavi";
import DoubleProgressBar from "@/ui/list/progress/DoubleProgressBar";
import QuizDashboard from "@/ui/list/QuizDashboard/QuizDashboard";

 

function HomePage() {
  return (
    <>
      <div className="flex justify-center">
        <div className="container px-4 py-10 flex justify-between gap-8">
          <CategoryNavi/>
          <QuizDashboard/>
        </div>
      </div>
    </>
  );
}

export default HomePage;
